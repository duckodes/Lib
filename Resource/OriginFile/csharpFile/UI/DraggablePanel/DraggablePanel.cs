using System.Collections;
using UnityEngine;

public class DraggablePanel : MonoBehaviour
{
    [SerializeField] private Rect m_rect = new Rect(0, 0, 700, 500);
    [Range(20, 50)] [SerializeField] private int m_titleSize = 20;
    [SerializeField] private TextAnchor m_textAnchor = TextAnchor.MiddleCenter;
    [Range(200, 1000)] [SerializeField] private int m_minSize = 200;
    [SerializeField] private Texture2D m_resizeCursor;

    private Rect m_panel;
    private Vector2 m_resizeStartMousePos;
    private Vector2 m_originalSize;
    private Vector2 m_recordSize;
    private Vector2 m_recordPosition;
    private Texture2D m_backgroundColor;
    private Texture2D m_titleColor;
    private Texture2D m_closeTexture;
    private Texture2D m_closeNormal;
    private Texture2D m_closeHover;
    private Texture2D m_closePress;
    private Texture2D m_resizeTexture;
    private Texture2D m_resizeNormal;
    private Texture2D m_resizeHover;
    private Texture2D m_resizePress;

    private float m_lastClickTime;
    private float m_doubleClickInterval = 0.3f;

    private bool m_isDragging = false;
    private bool m_isResizing = false;
    private void Awake()
    {
        m_panel = m_rect;
    }
    private void OnEnable()
    {
        m_originalSize = m_panel.size;

        m_closeNormal = MakeTex(1, 1, new Color(0.25f, 0.25f, 0.25f));
        m_closeHover = MakeTex(1, 1, new Color(0.5f, 0.5f, 0.5f));
        m_closePress = MakeTex(1, 1, new Color(0.05f, 0.05f, 0.05f));
        m_closeTexture = m_closeNormal;

        m_resizeNormal = MakeTex(1, 1, new Color(0.25f, 0.25f, 0.25f));
        m_resizeHover = MakeTex(1, 1, new Color(0.5f, 0.5f, 0.5f));
        m_resizePress = MakeTex(1, 1, new Color(0.05f, 0.05f, 0.05f));
        m_resizeTexture = m_resizeNormal;

        m_backgroundColor = MakeTex(1, 1, new Color(0.2f, 0.2f, 0.2f));
        m_titleColor = MakeTex(1, 1, new Color(0.3f, 0.3f, 0.3f));
    }
    private void OnGUI()
    {
        GUIStyle m_panelStyle = new GUIStyle(GUI.skin.window);
        m_panelStyle.normal.background = m_backgroundColor;
        m_panelStyle.onNormal.background = m_backgroundColor;
        m_panel = GUI.Window(0, m_panel, DrawPanel, string.Empty, m_panelStyle);
        if (!m_panel.Contains(Event.current.mousePosition) && Event.current.type == EventType.MouseUp)
        {
            m_isResizing = false;
            m_originalSize = m_panel.size;
        }
    }

    private void DrawPanel(int windowID)
    {
        GUIStyle titleStyle = new GUIStyle(GUI.skin.label);
        titleStyle.alignment = m_textAnchor;
        Rect titleRect = new Rect(0, 0, m_panel.width, m_titleSize);
        GUI.DrawTexture(titleRect, m_titleColor);
        GUI.Label(titleRect, "Draggable & Resizable Pane", titleStyle);

        GUI.Label(new Rect(10, 30, m_panel.width - 40, 20), "This is draggable panel!");

        Rect closeRect = new Rect(m_panel.width - (titleRect.height - 5) - 2, 2, titleRect.height - 5, titleRect.height - 5);
        GUIStyle closeLabelStyle = new GUIStyle(GUI.skin.label);
        closeLabelStyle.alignment = TextAnchor.MiddleCenter;
        GUI.DrawTexture(closeRect, m_closeTexture);
        GUI.Label(closeRect, "☓", closeLabelStyle);
        if (closeRect.Contains(Event.current.mousePosition))
        {
            if (Event.current.type == EventType.MouseDown)
            {
                m_closeTexture = m_closePress;
            }
            if(m_closeTexture != m_closePress)
            {
                m_closeTexture = m_closeHover;
            }
            if (Event.current.type == EventType.MouseUp)
            {
                gameObject.SetActive(false);
                m_closeTexture = m_closeNormal;
            }
        }
        else
        {
            m_closeTexture = m_closeNormal;
        }
        Rect resizeRect = new Rect(closeRect.x - (titleRect.height - 5), 2, titleRect.height - 5, titleRect.height - 5);
        GUIStyle resizeLabelStyle = new GUIStyle(GUI.skin.label);
        resizeLabelStyle.alignment = TextAnchor.MiddleCenter;
        GUI.DrawTexture(resizeRect, m_resizeTexture);
        GUI.Label(resizeRect, "❐", resizeLabelStyle);
        if (resizeRect.Contains(Event.current.mousePosition))
        {
            if (Event.current.type == EventType.MouseDown)
            {
                m_resizeTexture = m_resizePress;
            }
            if (m_resizeTexture != m_resizePress)
            {
                m_resizeTexture = m_resizeHover;
            }
            if (Event.current.type == EventType.MouseUp)
            {
                StartResize();
                m_resizeTexture = m_resizeNormal;
            }
        }
        else
        {
            m_resizeTexture = m_resizeNormal;
        }
        if (!closeRect.Contains(Event.current.mousePosition) &&
            !resizeRect.Contains(Event.current.mousePosition))
        {
            if (titleRect.Contains(Event.current.mousePosition))
            {
                if (Event.current.type == EventType.MouseDown)
                {
                    float currentTime = Time.realtimeSinceStartup;

                    if (currentTime - m_lastClickTime <= m_doubleClickInterval)
                    {
                        StartResize();
                    }
                    m_lastClickTime = currentTime;
                }
            }

            if (Event.current.type == EventType.MouseDown && titleRect.Contains(Event.current.mousePosition))
            {
                m_isDragging = true;
                m_resizeStartMousePos = Event.current.mousePosition;
            }

            if (m_isDragging)
            {
                m_panel.position += Event.current.mousePosition - m_resizeStartMousePos;
            }

            if (Event.current.type == EventType.MouseDown && new Rect(m_panel.width - 20, m_panel.height - 20, 20, 20).Contains(Event.current.mousePosition))
            {
                m_isResizing = true;
                m_resizeStartMousePos = Event.current.mousePosition;
            }
            if (new Rect(m_panel.width - 20, m_panel.height - 20, 20, 20).Contains(Event.current.mousePosition))
            {
                Cursor.SetCursor(m_resizeCursor, Vector2.zero, CursorMode.ForceSoftware);
            }
            else if(!m_isResizing)
            {
                Cursor.SetCursor(null, Vector2.zero, CursorMode.ForceSoftware);
            }
            if (m_isResizing)
            {
                float deltaX = Event.current.mousePosition.x - m_resizeStartMousePos.x;
                float deltaY = Event.current.mousePosition.y - m_resizeStartMousePos.y;
                m_panel.size = new Vector2(Mathf.Max(m_originalSize.x + deltaX, m_minSize), Mathf.Max(m_originalSize.y + deltaY, m_minSize));
            }

            if (Event.current.type == EventType.MouseUp)
            {
                m_isDragging = false;
                m_isResizing = false;
                m_originalSize = m_panel.size;
            }
            if (m_panel.position.x <= 0)
            {
                m_panel.position = new Vector2(0, m_panel.position.y);
            }
            if (m_panel.position.y <= 0)
            {
                m_panel.position = new Vector2(m_panel.position.x, 0);
            }
            if (m_panel.xMax >= Screen.width)
            {
                m_panel.position = new Vector2(Screen.width - m_panel.width, m_panel.position.y);
            }
            if (m_panel.yMax >= Screen.height)
            {
                m_panel.position = new Vector2(m_panel.position.x, Screen.height - m_panel.height);
            }
        }
    }
    private void StartResize()
    {
        StartCoroutine(ResizePanel());
    }
    private IEnumerator ResizePanel()
    {
        if (m_panel.size != new Vector2(Screen.width, Screen.height))
        {
            m_recordSize = m_panel.size;
            m_recordPosition = m_panel.position;

            float elapsedTime = 0f;

            while (elapsedTime < 1)
            {
                float t = elapsedTime / 1;
                m_panel.size = Vector2.Lerp(m_panel.size, new Vector2(Screen.width, Screen.height), t);
                elapsedTime += Time.deltaTime;
                m_isDragging = false;
                yield return null;
            }

            m_panel.size = new Vector2(Screen.width, Screen.height);
        }
        else
        {
            float elapsedTime = 0f;

            while (elapsedTime < 1)
            {
                float t = elapsedTime / 1;
                m_panel.position = Vector2.Lerp(m_panel.position, m_recordPosition, t);
                m_panel.size = Vector2.Lerp(m_panel.size, m_recordSize, t);
                elapsedTime += Time.deltaTime;
                m_isDragging = false;
                yield return null;
            }

            m_panel.size = m_recordSize;
        }
    }
    private Texture2D MakeTex(int width, int height, Color color)
    {
        Color[] pix = new Color[width * height];
        for (int i = 0; i < pix.Length; i++)
            pix[i] = color;
        Texture2D result = new Texture2D(width, height);
        result.SetPixels(pix);
        result.Apply();
        return result;
    }
}
