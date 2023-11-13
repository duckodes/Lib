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
    [SerializeField] private RectTransform m_rectTransform;

    [Tooltip("Activation")] [SerializeField] private Option m_option = Option.Hover;
    [Tooltip("Rect size")] [SerializeField] private Vector2 m_mutiplySize = new Vector2(1.2f, 1.2f);
    [Tooltip("Mutiply animation duration")] [Range(0, 2)] [SerializeField] private float m_animaitonSpeed = 0.5f;
    [SerializeField]
    private AnimationCurve m_enterSpeed = new AnimationCurve(
        new Keyframe(0, 0, 1, 2),
        new Keyframe(1, 1, 0, 1)
    );
    [SerializeField]
    private AnimationCurve m_leaveSpeed = new AnimationCurve(
        new Keyframe(0, 1, 1, 0),
        new Keyframe(1, 0, -2, 1)
    );

    private Vector2 m_defaultSizeDelta;
    private Vector2 m_mutiplySizeDelta;
    private bool m_isActive;
    private float m_hoverTime;
    private float m_animationDuration = 1f;

    private void Start()
    {
        m_defaultSizeDelta = m_rectTransform.sizeDelta;
    }
    private void Update()
    {
        Active();
    }
    private void Active()
    {
        if (m_isActive)
        {
            m_mutiplySizeDelta = new Vector2(m_defaultSizeDelta.x * m_mutiplySize.x, m_defaultSizeDelta.y * m_mutiplySize.y);
            if (m_hoverTime < m_animationDuration * m_animaitonSpeed)
            {
                m_hoverTime += Time.deltaTime;
                float progress = Mathf.Clamp01(m_hoverTime / (m_animationDuration * m_animaitonSpeed));
                float curveValue = m_enterSpeed.Evaluate(progress);
                m_rectTransform.sizeDelta = Vector2.Lerp(m_defaultSizeDelta, m_mutiplySizeDelta, curveValue);
            }
            else
            {
                m_hoverTime = m_animationDuration * m_animaitonSpeed;
            }
        }
        else
        {
            if (m_hoverTime > 0)
            {
                m_hoverTime -= Time.deltaTime;
                float progress = Mathf.Clamp01(m_hoverTime / (m_animationDuration * m_animaitonSpeed));
                float curveValue = m_leaveSpeed.Evaluate(progress);
                m_rectTransform.sizeDelta = Vector2.Lerp(m_mutiplySizeDelta, m_defaultSizeDelta, curveValue);
            }
            else
            {
                m_hoverTime = 0;
            }
        }
    }

    public void OnPointerEnter(PointerEventData pointerEventData) => m_isActive = m_option == Option.Hover ? true : m_isActive;
    public void OnPointerExit(PointerEventData pointerEventData) => m_isActive = m_option == Option.Hover ? false : m_isActive;
    public void OnPointerDown(PointerEventData pointerEventData) => m_isActive = m_option == Option.Click ? true : m_isActive;
    public void OnPointerUp(PointerEventData pointerEventData) => m_isActive = m_option == Option.Click ? false : m_isActive;
}
