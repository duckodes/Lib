using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;

namespace UGamie.Core
{
    /// <summary>
    /// Verion.1.0.2 Extension
    /// Source: https://bearhubs.github.io/Profolio/main.html
    /// </summary>
    /// 
    /// <remarks>
    /// extension update: 
    /// EmptyHide, 
    /// Background Color, 
    /// Background Texture2D,
    /// Show Silder
    /// </remarks>
    /// 
    /// <copyright file = "Search.cs" company = "UGsoft LLC">
    /// Copyright (C) 2023 UGamie LLC. With Copyright (C) 2023 UGsoft LLC. All rights reserved.
    /// </copyright>
    /// 
    /// <author>
    /// ugamiestudio@gmail.com
    /// </author>
    public class Search : MonoBehaviour
    {
        #region Editor
#if UNITY_EDITOR
        [UnityEditor.CustomEditor(typeof(Search))]
        private class SearchEditor : UnityEditor.Editor
        {
            private UnityEditor.SerializedProperty m_emptyHide;
            private UnityEditor.SerializedProperty m_sources;
            private UnityEditor.SerializedProperty m_onAction;
            private UnityEditor.SerializedProperty m_x;
            private UnityEditor.SerializedProperty m_y;
            private UnityEditor.SerializedProperty m_size;
            private UnityEditor.SerializedProperty m_buttonSize;

            private UnityEditor.SerializedProperty m_background;
            private UnityEditor.SerializedProperty m_backgroundColor;

            private UnityEditor.SerializedProperty m_fieldFixed;
            private UnityEditor.SerializedProperty m_fieldFont;
            private UnityEditor.SerializedProperty m_fieldFontSize;
            private UnityEditor.SerializedProperty m_fieldTextAnchor;
            private UnityEditor.SerializedProperty m_fieldSelectionColor;
            private UnityEditor.SerializedProperty m_fieldNormalBackground;
            private UnityEditor.SerializedProperty m_fieldNormalColor;
            private UnityEditor.SerializedProperty m_fieldNormalTextColor;
            private UnityEditor.SerializedProperty m_fieldHoverBackground;
            private UnityEditor.SerializedProperty m_fieldHoverColor;
            private UnityEditor.SerializedProperty m_fieldHoverTextColor;
            private UnityEditor.SerializedProperty m_fieldActiveBackground;
            private UnityEditor.SerializedProperty m_fieldActiveColor;
            private UnityEditor.SerializedProperty m_fieldActiveTextColor;
            private UnityEditor.SerializedProperty m_fieldFocusedBackground;
            private UnityEditor.SerializedProperty m_fieldFocusedColor;
            private UnityEditor.SerializedProperty m_fieldFocusedTextColor;

            private UnityEditor.SerializedProperty m_buttonFixed;
            private UnityEditor.SerializedProperty m_buttonFont;
            private UnityEditor.SerializedProperty m_buttonFontSize;
            private UnityEditor.SerializedProperty m_buttonTextAnchor;
            private UnityEditor.SerializedProperty m_buttonNormalBackground;
            private UnityEditor.SerializedProperty m_buttonNormalColor;
            private UnityEditor.SerializedProperty m_buttonNormalTextColor;
            private UnityEditor.SerializedProperty m_buttonHoverBackground;
            private UnityEditor.SerializedProperty m_buttonHoverColor;
            private UnityEditor.SerializedProperty m_buttonHoverTextColor;
            private UnityEditor.SerializedProperty m_buttonActiveBackground;
            private UnityEditor.SerializedProperty m_buttonActiveColor;
            private UnityEditor.SerializedProperty m_buttonActiveTextColor;

            private UnityEditor.SerializedProperty m_showSlider;
            private UnityEditor.SerializedProperty m_sliderNormalBackground;
            private UnityEditor.SerializedProperty m_sliderNormalColor;
            private UnityEditor.SerializedProperty m_sliderHoverBackground;
            private UnityEditor.SerializedProperty m_sliderHoverColor;
            private UnityEditor.SerializedProperty m_sliderActiveBackground;
            private UnityEditor.SerializedProperty m_sliderActiveColor;
            private UnityEditor.SerializedProperty m_sliderThumbNormalBackground;
            private UnityEditor.SerializedProperty m_sliderThumbNormalColor;
            private UnityEditor.SerializedProperty m_sliderThumbHoverBackground;
            private UnityEditor.SerializedProperty m_sliderThumbHoverColor;
            private UnityEditor.SerializedProperty m_sliderThumbActiveBackground;
            private UnityEditor.SerializedProperty m_sliderThumbActiveColor;

            private UnityEditor.SerializedProperty m_fieldArea;
            private UnityEditor.SerializedProperty m_buttonArea;
            private UnityEditor.SerializedProperty m_sliderArea;
            private void OnEnable()
            {
                m_emptyHide = serializedObject.FindProperty("m_emptyHide");
                m_sources = serializedObject.FindProperty("m_sources");
                m_onAction = serializedObject.FindProperty("m_onAction");
                m_x = serializedObject.FindProperty("m_x");
                m_y = serializedObject.FindProperty("m_y");
                m_size = serializedObject.FindProperty("m_size");
                m_buttonSize = serializedObject.FindProperty("m_buttonSize");

                m_background = serializedObject.FindProperty("m_background");
                m_backgroundColor = serializedObject.FindProperty("m_backgroundColor");

                m_fieldFixed = serializedObject.FindProperty("m_fieldFixed");
                m_fieldFont = serializedObject.FindProperty("m_fieldFont");
                m_fieldFontSize = serializedObject.FindProperty("m_fieldFontSize");
                m_fieldTextAnchor = serializedObject.FindProperty("m_fieldTextAnchor");
                m_fieldSelectionColor = serializedObject.FindProperty("m_fieldSelectionColor");
                m_fieldNormalBackground = serializedObject.FindProperty("m_fieldNormalBackground");
                m_fieldNormalColor = serializedObject.FindProperty("m_fieldNormalColor");
                m_fieldNormalTextColor = serializedObject.FindProperty("m_fieldNormalTextColor");
                m_fieldHoverBackground = serializedObject.FindProperty("m_fieldHoverBackground");
                m_fieldHoverColor = serializedObject.FindProperty("m_fieldHoverColor");
                m_fieldHoverTextColor = serializedObject.FindProperty("m_fieldHoverTextColor");
                m_fieldActiveBackground = serializedObject.FindProperty("m_fieldActiveBackground");
                m_fieldActiveColor = serializedObject.FindProperty("m_fieldActiveColor");
                m_fieldActiveTextColor = serializedObject.FindProperty("m_fieldActiveTextColor");
                m_fieldFocusedBackground = serializedObject.FindProperty("m_fieldFocusedBackground");
                m_fieldFocusedColor = serializedObject.FindProperty("m_fieldFocusedColor");
                m_fieldFocusedTextColor = serializedObject.FindProperty("m_fieldFocusedTextColor");

                m_buttonFixed = serializedObject.FindProperty("m_buttonFixed");
                m_buttonFont = serializedObject.FindProperty("m_buttonFont");
                m_buttonFontSize = serializedObject.FindProperty("m_buttonFontSize");
                m_buttonTextAnchor = serializedObject.FindProperty("m_buttonTextAnchor");
                m_buttonNormalBackground = serializedObject.FindProperty("m_buttonNormalBackground");
                m_buttonNormalColor = serializedObject.FindProperty("m_buttonNormalColor");
                m_buttonNormalTextColor = serializedObject.FindProperty("m_buttonNormalTextColor");
                m_buttonHoverBackground = serializedObject.FindProperty("m_buttonHoverBackground");
                m_buttonHoverColor = serializedObject.FindProperty("m_buttonHoverColor");
                m_buttonHoverTextColor = serializedObject.FindProperty("m_buttonHoverTextColor");
                m_buttonActiveBackground = serializedObject.FindProperty("m_buttonActiveBackground");
                m_buttonActiveColor = serializedObject.FindProperty("m_buttonActiveColor");
                m_buttonActiveTextColor = serializedObject.FindProperty("m_buttonActiveTextColor");

                m_showSlider = serializedObject.FindProperty("m_showSlider");
                m_sliderNormalBackground = serializedObject.FindProperty("m_sliderNormalBackground");
                m_sliderNormalColor = serializedObject.FindProperty("m_sliderNormalColor");
                m_sliderHoverBackground = serializedObject.FindProperty("m_sliderHoverBackground");
                m_sliderHoverColor = serializedObject.FindProperty("m_sliderHoverColor");
                m_sliderActiveBackground = serializedObject.FindProperty("m_sliderActiveBackground");
                m_sliderActiveColor = serializedObject.FindProperty("m_sliderActiveColor");
                m_sliderThumbNormalBackground = serializedObject.FindProperty("m_sliderThumbNormalBackground");
                m_sliderThumbNormalColor = serializedObject.FindProperty("m_sliderThumbNormalColor");
                m_sliderThumbHoverBackground = serializedObject.FindProperty("m_sliderThumbHoverBackground");
                m_sliderThumbHoverColor = serializedObject.FindProperty("m_sliderThumbHoverColor");
                m_sliderThumbActiveBackground = serializedObject.FindProperty("m_sliderThumbActiveBackground");
                m_sliderThumbActiveColor = serializedObject.FindProperty("m_sliderThumbActiveColor");

                m_fieldArea = serializedObject.FindProperty("m_fieldArea");
                m_buttonArea = serializedObject.FindProperty("m_buttonArea");
                m_sliderArea = serializedObject.FindProperty("m_sliderArea");
            }   
            public override void OnInspectorGUI()
            {
                serializedObject.Update();

                UnityEditor.EditorGUILayout.PropertyField(m_emptyHide, new GUIContent("Empty Hide", " False =>\n Source area will show buttons, when field empty."));
                UnityEditor.EditorGUILayout.PropertyField(m_sources);
                UnityEditor.EditorGUILayout.PropertyField(m_onAction);
                UnityEditor.EditorGUILayout.PropertyField(m_x);
                UnityEditor.EditorGUILayout.PropertyField(m_y);
                UnityEditor.EditorGUILayout.PropertyField(m_size);
                UnityEditor.EditorGUILayout.PropertyField(m_buttonSize);
                UnityEditor.EditorGUILayout.PropertyField(m_background);
                if (m_background.objectReferenceValue == null)
                {
                    UnityEditor.EditorGUILayout.PropertyField(m_backgroundColor);
                }
                m_fieldArea.boolValue = UnityEditor.EditorGUILayout.BeginFoldoutHeaderGroup(m_fieldArea.boolValue, "Field Option");
                if (m_fieldArea.boolValue)
                {
                    UnityEditor.EditorGUILayout.PropertyField(m_fieldFixed);
                    UnityEditor.EditorGUILayout.PropertyField(m_fieldFont);
                    UnityEditor.EditorGUILayout.PropertyField(m_fieldFontSize);
                    UnityEditor.EditorGUILayout.PropertyField(m_fieldTextAnchor);
                    UnityEditor.EditorGUILayout.PropertyField(m_fieldSelectionColor);
                    UnityEditor.EditorGUILayout.PropertyField(m_fieldNormalBackground);
                    if (m_fieldNormalBackground.objectReferenceValue == null)
                    {
                        UnityEditor.EditorGUILayout.PropertyField(m_fieldNormalColor);
                        UnityEditor.EditorGUILayout.PropertyField(m_fieldNormalTextColor);
                    }
                    UnityEditor.EditorGUILayout.PropertyField(m_fieldHoverBackground);
                    if (m_fieldHoverBackground.objectReferenceValue == null)
                    {
                        UnityEditor.EditorGUILayout.PropertyField(m_fieldHoverColor);
                        UnityEditor.EditorGUILayout.PropertyField(m_fieldHoverTextColor);
                    }
                    UnityEditor.EditorGUILayout.PropertyField(m_fieldActiveBackground);
                    if (m_fieldActiveBackground.objectReferenceValue == null)
                    {
                        UnityEditor.EditorGUILayout.PropertyField(m_fieldActiveColor);
                        UnityEditor.EditorGUILayout.PropertyField(m_fieldActiveTextColor);
                    }
                    UnityEditor.EditorGUILayout.PropertyField(m_fieldFocusedBackground);
                    if (m_fieldFocusedBackground.objectReferenceValue == null)
                    {
                        UnityEditor.EditorGUILayout.PropertyField(m_fieldFocusedColor);
                        UnityEditor.EditorGUILayout.PropertyField(m_fieldFocusedTextColor);
                    }
                }
                UnityEditor.EditorGUILayout.EndFoldoutHeaderGroup();

                m_buttonArea.boolValue = UnityEditor.EditorGUILayout.BeginFoldoutHeaderGroup(m_buttonArea.boolValue, "Button Option");
                if (m_buttonArea.boolValue)
                {
                    UnityEditor.EditorGUILayout.PropertyField(m_buttonFixed);
                    UnityEditor.EditorGUILayout.PropertyField(m_buttonFont);
                    UnityEditor.EditorGUILayout.PropertyField(m_buttonFontSize);
                    UnityEditor.EditorGUILayout.PropertyField(m_buttonTextAnchor);
                    UnityEditor.EditorGUILayout.PropertyField(m_buttonNormalBackground);
                    if (m_buttonNormalBackground.objectReferenceValue == null)
                    {
                        UnityEditor.EditorGUILayout.PropertyField(m_buttonNormalColor);
                        UnityEditor.EditorGUILayout.PropertyField(m_buttonNormalTextColor);
                    }
                    UnityEditor.EditorGUILayout.PropertyField(m_buttonHoverBackground);
                    if (m_buttonHoverBackground.objectReferenceValue == null)
                    {
                        UnityEditor.EditorGUILayout.PropertyField(m_buttonHoverColor);
                        UnityEditor.EditorGUILayout.PropertyField(m_buttonHoverTextColor);
                    }
                    UnityEditor.EditorGUILayout.PropertyField(m_buttonActiveBackground);
                    if (m_buttonActiveBackground.objectReferenceValue == null)
                    {
                        UnityEditor.EditorGUILayout.PropertyField(m_buttonActiveColor);
                        UnityEditor.EditorGUILayout.PropertyField(m_buttonActiveTextColor);
                    }
                }
                UnityEditor.EditorGUILayout.EndFoldoutHeaderGroup();

                m_sliderArea.boolValue = UnityEditor.EditorGUILayout.BeginFoldoutHeaderGroup(m_sliderArea.boolValue, "Slider Option");
                if (m_sliderArea.boolValue)
                {
                    UnityEditor.EditorGUILayout.PropertyField(m_showSlider);
                    UnityEditor.EditorGUILayout.PropertyField(m_sliderNormalBackground);
                    if (m_sliderNormalBackground.objectReferenceValue == null)
                    {
                        UnityEditor.EditorGUILayout.PropertyField(m_sliderNormalColor);
                    }
                    UnityEditor.EditorGUILayout.PropertyField(m_sliderHoverBackground);
                    if (m_sliderHoverBackground.objectReferenceValue == null)
                    {
                        UnityEditor.EditorGUILayout.PropertyField(m_sliderHoverColor);
                    }
                    UnityEditor.EditorGUILayout.PropertyField(m_sliderActiveBackground);
                    if (m_sliderActiveBackground.objectReferenceValue == null)
                    {
                        UnityEditor.EditorGUILayout.PropertyField(m_sliderActiveColor);
                    }
                    UnityEditor.EditorGUILayout.PropertyField(m_sliderThumbNormalBackground);
                    if (m_sliderThumbNormalBackground.objectReferenceValue == null)
                    {
                        UnityEditor.EditorGUILayout.PropertyField(m_sliderThumbNormalColor);
                    }
                    UnityEditor.EditorGUILayout.PropertyField(m_sliderThumbHoverBackground);
                    if (m_sliderThumbHoverBackground.objectReferenceValue == null)
                    {
                        UnityEditor.EditorGUILayout.PropertyField(m_sliderThumbHoverColor);
                    }
                    UnityEditor.EditorGUILayout.PropertyField(m_sliderThumbActiveBackground);
                    if (m_sliderThumbActiveBackground.objectReferenceValue == null)
                    {
                        UnityEditor.EditorGUILayout.PropertyField(m_sliderThumbActiveColor);
                    }
                }
                UnityEditor.EditorGUILayout.EndFoldoutHeaderGroup();

                serializedObject.ApplyModifiedProperties();
            }
        }
#endif
        #endregion
        [SerializeField] private bool m_emptyHide;
        [SerializeField] private string[] m_sources;
        [SerializeField] private UnityEvent<string> m_onAction;
        [Range(0, 100)][SerializeField] private float m_x = 50;
        [Range(0, 100)][SerializeField] private float m_y = 50;
        [SerializeField] private Vector2 m_size = new Vector2(195, 20);
        [SerializeField] private Vector2 m_buttonSize = new Vector2(200, 20);

        [SerializeField] private Texture2D m_background;
        [SerializeField] private Color m_backgroundColor = new Color(0.15f, 0.15f, 0.15f);

        [SerializeField] private bool m_fieldFixed = true;
        [SerializeField] private Font m_fieldFont;
        [SerializeField] private int m_fieldFontSize = 12;
        [SerializeField] private TextAnchor m_fieldTextAnchor = TextAnchor.MiddleLeft;
        [SerializeField] private Color m_fieldSelectionColor = new Color(0.6f, 0.6f, 0.6f);
        [SerializeField] private Texture2D m_fieldNormalBackground;
        [SerializeField] private Color m_fieldNormalColor = new Color(0.15f, 0.15f, 0.15f);
        [SerializeField] private Color m_fieldNormalTextColor = Color.white;
        [SerializeField] private Texture2D m_fieldHoverBackground;
        [SerializeField] private Color m_fieldHoverColor = new Color(0.18f, 0.18f, 0.18f);
        [SerializeField] private Color m_fieldHoverTextColor = Color.white;
        [SerializeField] private Texture2D m_fieldActiveBackground;
        [SerializeField] private Color m_fieldActiveColor = new Color(0.3f, 0.3f, 0.3f);
        [SerializeField] private Color m_fieldActiveTextColor = Color.white;
        [SerializeField] private Texture2D m_fieldFocusedBackground;
        [SerializeField] private Color m_fieldFocusedColor = new Color(0.3f, 0.3f, 0.3f);
        [SerializeField] private Color m_fieldFocusedTextColor = Color.white;

        [SerializeField] private bool m_buttonFixed = false;
        [SerializeField] private Font m_buttonFont;
        [SerializeField] private int m_buttonFontSize = 12;
        [SerializeField] private TextAnchor m_buttonTextAnchor = TextAnchor.MiddleCenter;
        [SerializeField] private Texture2D m_buttonNormalBackground;
        [SerializeField] private Color m_buttonNormalColor = new Color(0.25f, 0.25f, 0.25f);
        [SerializeField] private Color m_buttonNormalTextColor = Color.white;
        [SerializeField] private Texture2D m_buttonHoverBackground;
        [SerializeField] private Color m_buttonHoverColor = new Color(0.35f, 0.35f, 0.35f);
        [SerializeField] private Color m_buttonHoverTextColor = Color.white;
        [SerializeField] private Texture2D m_buttonActiveBackground;
        [SerializeField] private Color m_buttonActiveColor = new Color(0.3f, 0.3f, 0.3f);
        [SerializeField] private Color m_buttonActiveTextColor = Color.white;

        [SerializeField] private bool m_showSlider = true;
        [SerializeField] private Texture2D m_sliderNormalBackground;
        [SerializeField] private Color m_sliderNormalColor = new Color(0.25f, 0.25f, 0.25f);
        [SerializeField] private Texture2D m_sliderHoverBackground;
        [SerializeField] private Color m_sliderHoverColor = new Color(0.25f, 0.25f, 0.25f);
        [SerializeField] private Texture2D m_sliderActiveBackground;
        [SerializeField] private Color m_sliderActiveColor = new Color(0.3f, 0.3f, 0.3f);
        [SerializeField] private Texture2D m_sliderThumbNormalBackground;
        [SerializeField] private Color m_sliderThumbNormalColor = new Color(0.45f, 0.45f, 0.45f);
        [SerializeField] private Texture2D m_sliderThumbHoverBackground;
        [SerializeField] private Color m_sliderThumbHoverColor = new Color(0.55f, 0.55f, 0.55f);
        [SerializeField] private Texture2D m_sliderThumbActiveBackground;
        [SerializeField] private Color m_sliderThumbActiveColor = new Color(0.5f, 0.5f, 0.5f);

        [SerializeField] private bool m_fieldArea;
        [SerializeField] private bool m_buttonArea;
        [SerializeField] private bool m_sliderArea;

        private Searcher m_searcher;

        private Vector2 m_scrollPosition = Vector2.zero;

        private GUISkin m_sliderThumbSkin;

        private void Awake()
        {
            m_searcher = new Searcher();

            if (m_background == null)
            {
                m_background = MakeTex(1, 1, m_backgroundColor);
            }

            if (m_fieldNormalBackground == null)
            {
                m_fieldNormalBackground = MakeTex(1, 1, m_fieldNormalColor);
            }
            if (m_fieldHoverBackground == null)
            {
                m_fieldHoverBackground = MakeTex(1, 1, m_fieldHoverColor);
            }
            if (m_fieldActiveBackground == null)
            {
                m_fieldActiveBackground = MakeTex(1, 1, m_fieldActiveColor);
            }
            if (m_fieldFocusedBackground == null)
            {
                m_fieldFocusedBackground = MakeTex(1, 1, m_fieldFocusedColor);
            }

            if (m_buttonNormalBackground == null)
            {
                m_buttonNormalBackground = MakeTex(1, 1, m_buttonNormalColor);
            }
            if (m_buttonHoverBackground == null)
            {
                m_buttonHoverBackground = MakeTex(1, 1, m_buttonHoverColor);
            }
            if (m_buttonActiveBackground == null)
            {
                m_buttonActiveBackground = MakeTex(1, 1, m_buttonActiveColor);
            }

            if (m_sliderNormalBackground == null)
            {
                m_sliderNormalBackground = MakeTex(1, 1, m_sliderNormalColor);
            }
            if (m_sliderHoverBackground == null)
            {
                m_sliderHoverBackground = MakeTex(1, 1, m_sliderHoverColor);
            }
            if (m_sliderActiveBackground == null)
            {
                m_sliderActiveBackground = MakeTex(1, 1, m_sliderActiveColor);
            }

            m_sliderThumbSkin = ScriptableObject.CreateInstance<GUISkin>();
            if (m_sliderThumbNormalBackground == null)
            {
                m_sliderThumbSkin.verticalScrollbarThumb.normal.background = MakeTex(1, 1, m_sliderThumbNormalColor);
                m_sliderThumbNormalBackground = MakeTex(1, 1, m_sliderThumbNormalColor);
            }
            if (m_sliderThumbHoverBackground == null)
            {
                m_sliderThumbSkin.verticalScrollbarThumb.hover.background = MakeTex(1, 1, m_sliderThumbHoverColor);
                m_sliderThumbHoverBackground = m_sliderThumbSkin.verticalScrollbarThumb.hover.background;
            }
            if (m_sliderThumbActiveBackground == null)
            {
                m_sliderThumbSkin.verticalScrollbarThumb.active.background = MakeTex(1, 1, m_sliderThumbActiveColor);
                m_sliderThumbActiveBackground = m_sliderThumbSkin.verticalScrollbarThumb.active.background;
            }
        }
        private void OnGUI()
        {
            FieldStyle(out GUIStyle fieldStyle);
            ButtonStyle(out GUIStyle buttonStyle);
            SliderStyle(out GUIStyle sliderStyle);
            GUILayout.BeginHorizontal();
            float x = (Screen.width * (m_x / 100)) - (m_size.x * (m_x / 100));
            x = Mathf.Clamp(x, 0, Screen.width - m_size.x);
            //GUILayout.Space(x);
            GUILayout.BeginVertical();
            float y = (Screen.height * (m_y / 100)) - ((m_size.y + m_buttonSize.y * m_sources.Length * 1.16f) * (m_y / 100));
            y = Mathf.Clamp(y, 0, Screen.height - (m_size.y + m_buttonSize.y * m_sources.Length * 1.16f));
            //GUILayout.Space(y);
            float yy = (Screen.height * (m_y / 100)) - ((m_size.y + (m_size.y * 10)) * (m_y / 100));
            yy = Mathf.Clamp(yy, 0, Screen.height - (m_size.y + (m_size.y * 10)));
            GUI.DrawTexture(new Rect(x, yy, m_size.x + 20 >= m_buttonSize.x + 15 ? m_size.x + 20 : m_buttonSize.x + 15, m_size.y + m_size.y * 10), m_background);
            GUI.skin.settings.selectionColor = m_fieldSelectionColor;
            m_searcher.m_keyword = GUI.TextField(new Rect(x, yy, m_size.x, m_size.y), m_searcher.m_keyword, fieldStyle);

            GUI.skin = m_sliderThumbSkin;
            if (m_showSlider)
            {
                if (m_buttonFixed)
                {
                    m_scrollPosition = GUI.BeginScrollView(new Rect(x, yy + m_size.y, m_size.x + 20 >= m_buttonSize.x + 20 ? m_size.x + 20 : m_buttonSize.x + 20, m_size.y * 10), m_scrollPosition, new Rect(0, 0, m_size.x >= m_buttonSize.x ? m_size.x : m_buttonSize.x, m_sources.Length * m_buttonSize.y * 1.16f), GUIStyle.none, sliderStyle);
                }
                else
                {
                    m_scrollPosition = GUI.BeginScrollView(new Rect(x, yy + m_size.y, m_size.x + 20 >= m_buttonSize.x + 15 ? m_size.x + 20 : m_buttonSize.x + 15, m_size.y * 10), m_scrollPosition, new Rect(0, 0, m_size.x >= m_buttonSize.x ? m_size.x : m_buttonSize.x, m_sources.Length * m_buttonSize.y), GUIStyle.none, sliderStyle);
                }
            }
            else
            {
                if (m_buttonFixed)
                {
                    m_scrollPosition = GUI.BeginScrollView(new Rect(x, yy + m_size.y, m_size.x + 20 >= m_buttonSize.x + 20 ? m_size.x + 20 : m_buttonSize.x + 20, m_size.y * 10), m_scrollPosition, new Rect(0, 0, m_size.x >= m_buttonSize.x ? m_size.x : m_buttonSize.x, m_sources.Length * m_buttonSize.y * 1.16f), GUIStyle.none, GUIStyle.none);
                }
                else
                {
                    m_scrollPosition = GUI.BeginScrollView(new Rect(x, yy + m_size.y, m_size.x + 20 >= m_buttonSize.x + 15 ? m_size.x + 20 : m_buttonSize.x + 15, m_size.y * 10), m_scrollPosition, new Rect(0, 0, m_size.x >= m_buttonSize.x ? m_size.x : m_buttonSize.x, m_sources.Length * m_buttonSize.y), GUIStyle.none, GUIStyle.none);
                }
            }
            GUI.skin = null;
            m_searcher.Search(m_sources, (items) =>
            {
                if (m_emptyHide)
                {
                    if (m_searcher.m_keyword != string.Empty && GUILayout.Button(items, buttonStyle, GUILayout.Width(m_buttonSize.x), GUILayout.Height(m_buttonSize.y)))
                    {
                        m_onAction?.Invoke(items);
                    }
                }
                else
                {
                    if (GUILayout.Button(items, buttonStyle, GUILayout.Width(m_buttonSize.x), GUILayout.Height(m_buttonSize.y)))
                    {
                        m_onAction?.Invoke(items);
                    }
                }
            });
            GUI.EndScrollView();

            GUILayout.EndVertical();
            GUILayout.EndHorizontal();
        }
        private void FieldStyle(out GUIStyle fieldStyle)
        {
            if (m_fieldFixed)
            {
                fieldStyle = new GUIStyle(GUI.skin.textField);
            }
            else
            {
                fieldStyle = new GUIStyle();
            }
            fieldStyle.font = m_fieldFont;
            fieldStyle.fontSize = m_fieldFontSize;
            fieldStyle.alignment = m_fieldTextAnchor;
            fieldStyle.normal.background = m_fieldNormalBackground;
            fieldStyle.hover.background = m_fieldHoverBackground;
            fieldStyle.active.background = m_fieldActiveBackground;
            fieldStyle.focused.background = m_fieldFocusedBackground;
            fieldStyle.normal.textColor = m_fieldNormalTextColor;
            fieldStyle.hover.textColor = m_fieldHoverTextColor;
            fieldStyle.active.textColor = m_fieldActiveTextColor;
            fieldStyle.focused.textColor = m_fieldFocusedTextColor;

        }
        private void ButtonStyle(out GUIStyle buttonStyle)
        {
            if (m_buttonFixed)
            {
                buttonStyle = new GUIStyle(GUI.skin.button);
            }
            else
            {
                buttonStyle = new GUIStyle();
            }
            buttonStyle.font = m_buttonFont;
            buttonStyle.fontSize = m_buttonFontSize;
            buttonStyle.alignment = m_buttonTextAnchor;
            buttonStyle.normal.background = m_buttonNormalBackground;
            buttonStyle.hover.background = m_buttonHoverBackground;
            buttonStyle.active.background = m_buttonActiveBackground;
            buttonStyle.normal.textColor = m_buttonNormalTextColor;
            buttonStyle.hover.textColor = m_buttonHoverTextColor;
            buttonStyle.active.textColor = m_buttonActiveTextColor;
        }
        private void SliderStyle(out GUIStyle sliderStyle)
        {
            sliderStyle = new GUIStyle(GUI.skin.verticalScrollbar);
            sliderStyle.normal.background = m_sliderNormalBackground;
            sliderStyle.hover.background = m_sliderHoverBackground;
            sliderStyle.active.background = m_sliderActiveBackground;
        }
        private Texture2D MakeTex(int width, int height, Color color)
        {
            Color[] pix = new Color[width * height];
            for (int i = 0; i < pix.Length; i++)
                pix[i] = color;
            Texture2D result = new Texture2D(width, height, TextureFormat.ARGB32, false);
            result.filterMode = FilterMode.Point;
            result.SetPixels(pix);
            result.Apply();
            return result;
        }
        
        public void SetSource(string[] source) => m_sources = source;
        public void SetSource(List<string> source) => m_sources = source.ToArray();
        public void SetX(float x) => m_x = x;
        public void SetY(float y) => m_y = y;
        public void SetSize(Vector2 size) => m_size = size;
        public void SetButtonSize(Vector2 size) => m_buttonSize = size;
        public void SetKeyword(string fieldText) => m_searcher.m_keyword = fieldText;
    }
}
