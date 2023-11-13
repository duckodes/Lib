using UnityEngine;
using UnityEngine.EventSystems;

public class RectTransformSizer : MonoBehaviour, 
    IPointerEnterHandler, IPointerExitHandler, IPointerDownHandler, IPointerUpHandler
{
    private enum Option
    {
        Hover,
        Click
    }
    [SerializeField] private RectTransform rectTransform;

    [Tooltip("Activation")] [SerializeField] private Option option = Option.Hover;
    [Tooltip("Rect size")] [SerializeField] private Vector2 mutiplySize = new Vector2(1.2f, 1.2f);
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

    private Vector2 defaultSizeDelta;
    private Vector2 mutiplySizeDelta;
    private bool isActive;
    private float hoverTime;
    private float animationDuration = 1f;
    private void Start()
    {
        defaultSizeDelta = rectTransform.sizeDelta;
    }
    private void Update()
    {
        Active();
    }
    private void Active()
    {
        if (isActive)
        {
            mutiplySizeDelta = new Vector2(defaultSizeDelta.x * mutiplySize.x, defaultSizeDelta.y * mutiplySize.y);
            if (hoverTime < animationDuration * animaitonSpeed)
            {
                hoverTime += Time.deltaTime;
                float progress = Mathf.Clamp01(hoverTime / (animationDuration * animaitonSpeed));
                float curveValue = EnterSpeed.Evaluate(progress);
                rectTransform.sizeDelta = Vector2.Lerp(defaultSizeDelta, mutiplySizeDelta, curveValue);
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
                rectTransform.sizeDelta = Vector2.Lerp(mutiplySizeDelta, defaultSizeDelta, curveValue);
            }
            else
            {
                hoverTime = 0;
            }
        }
    }
    
    public void OnPointerEnter(PointerEventData pointerEventData) => isActive = option == Option.Hover ? true : isActive;
    public void OnPointerExit(PointerEventData pointerEventData) => isActive = option == Option.Hover ? false : isActive;
    public void OnPointerDown(PointerEventData pointerEventData) => isActive = option == Option.Click ? true : isActive;
    public void OnPointerUp(PointerEventData pointerEventData) => isActive = option == Option.Click ? false : isActive;
}
