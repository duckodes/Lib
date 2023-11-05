using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;

public class LegacyTextSizer : MonoBehaviour, 
    IPointerEnterHandler, IPointerExitHandler, IPointerDownHandler, IPointerUpHandler
{
    private enum Option
    {
        Hover,
        Click
    }
    [SerializeField] private Text text;

    [Tooltip("Activation")] [SerializeField] private Option option = Option.Hover;
    [Tooltip("Font size")] [Range(0, 1.8f)] [SerializeField] private float mutiplySize = 1.2f;
    [Tooltip("Mutiply animation duration")] [Range(0, 2)] [SerializeField] private float animaitonSpeed = 0.5f;
    [SerializeField]
    private AnimationCurve EnterSpeed = new AnimationCurve(
        new Keyframe(0, 0, 1, 2),
        new Keyframe(1, 1, 0, 1)
    );
    [SerializeField]
    private AnimationCurve LeaveSpeed = new AnimationCurve(
        new Keyframe(0, 1, 1, 0),
        new Keyframe(1, 0, -2, 1)
    );
    public void OnPointerEnter(PointerEventData pointerEventData) => isActive = option == Option.Hover ? true : isActive;
    public void OnPointerExit(PointerEventData pointerEventData) => isActive = option == Option.Hover ? false : isActive;
    public void OnPointerDown(PointerEventData pointerEventData) => isActive = option == Option.Click ? true : isActive;
    public void OnPointerUp(PointerEventData pointerEventData) => isActive = option == Option.Click ? false : isActive;

    private float defaultSizeDelta;
    private float mutiplySizeDelta;
    private bool isActive;
    private float hoverTime;
    private float animationDuration = 1f;
    private void Start()
    {
        defaultSizeDelta = text.fontSize;
    }
    private void Update()
    {
        Active();
    }
    private void Active()
    {
        if (isActive)
        {
            mutiplySizeDelta = defaultSizeDelta * mutiplySize;
            if (hoverTime < animationDuration * animaitonSpeed)
            {
                hoverTime += Time.deltaTime;
                float progress = Mathf.Clamp01(hoverTime / (animationDuration * animaitonSpeed));
                float curveValue = EnterSpeed.Evaluate(progress);
                text.fontSize = (int)Mathf.Lerp(defaultSizeDelta, mutiplySizeDelta, curveValue);
            }
            else
            {
                hoverTime = animationDuration * animaitonSpeed;
            }
        }
        else
        {
            if (hoverTime > 0)
            {
                hoverTime -= Time.deltaTime;
                float progress = Mathf.Clamp01(hoverTime / (animationDuration * animaitonSpeed));
                float curveValue = LeaveSpeed.Evaluate(progress);
                text.fontSize = (int)Mathf.Lerp(mutiplySizeDelta, defaultSizeDelta, curveValue);
            }
            else
            {
                hoverTime = 0;
            }
        }
    }
}