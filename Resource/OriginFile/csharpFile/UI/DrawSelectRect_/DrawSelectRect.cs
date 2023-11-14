using UnityEngine;

public class DrawSelectRect : MonoBehaviour
{
    [SerializeField] private Color m_color = Color.white;

    private Vector2 m_startPoint;
    private Vector2 m_endPoint;
    private bool m_drawing = false;

    private void OnGUI()
    {
        if (m_drawing)
        {
            DrawLine(m_startPoint, m_endPoint, m_color);
        }
        HandleInput();
    }


    private void HandleInput()
    {
        Vector2 mousePosition = new Vector2(Input.mousePosition.x, Screen.height - Input.mousePosition.y);

        if (Input.GetKeyDown(KeyCode.Mouse0))
        {
            m_startPoint = mousePosition;
            m_endPoint = mousePosition;
            m_drawing = true;
        }
        else if (Input.GetKeyUp(KeyCode.Mouse0))
        {
            m_drawing = false;
        }
        else if (Input.GetKey(KeyCode.Mouse0))
        {
            m_endPoint = mousePosition;
        }
    }

    private void DrawLine(Vector2 start, Vector2 end, Color color)
    {
        Texture2D tex = new Texture2D(1, 1);
        tex.SetPixel(0, 0, color);
        tex.Apply();

        GUI.color = color;
        GUI.DrawTexture(new Rect(start.x, start.y, end.x - start.x, end.y - start.y), tex);

        GUI.color = Color.white;
    }
}