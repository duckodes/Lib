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
    [SerializeField] private Text m_text;

    [Tooltip("Activation")] [SerializeField] private Option m_option = Option.Hover;
    [Tooltip("Font size")] [Range(0, 1.8f)] [SerializeField] private float m_mutiplySize = 1.2f;
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

    private float m_defaultSizeDelta;
    private float m_mutiplySizeDelta;
    private bool m_isActive;
    private float m_hoverTime;
    private float m_animationDuration = 1f;

    private void Start()
    {
        m_defaultSizeDelta = m_text.fontSize;
    }
    private void Update()
    {
        Active();
    }
    private void Active()
    {
        if (m_isActive)
        {
            m_mutiplySizeDelta = m_defaultSizeDelta * m_mutiplySize;
            if (m_hoverTime < m_animationDuration * m_animaitonSpeed)
            {
                m_hoverTime += Time.deltaTime;
                float progress = Mathf.Clamp01(m_hoverTime / (m_animationDuration * m_animaitonSpeed));
                float curveValue = m_enterSpeed.Evaluate(progress);
                m_text.fontSize = (int)Mathf.Lerp(m_defaultSizeDelta, m_mutiplySizeDelta, curveValue);
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
                m_text.fontSize = (int)Mathf.Lerp(m_mutiplySizeDelta, m_defaultSizeDelta, curveValue);
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