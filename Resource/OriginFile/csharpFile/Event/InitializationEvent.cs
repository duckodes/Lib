using UnityEngine;
using UnityEngine.Events;

namespace UGamie.Core.InitEvent
{
    public class InitializationEvent : MonoBehaviour
    {
        #region Editor
#if UNITY_EDITOR
        [UnityEditor.CustomEditor(typeof(InitializationEvent))]
        public class BeginEventEditor : UnityEditor.Editor
        {
            private UnityEditor.SerializedProperty m_onAwake;
            private UnityEditor.SerializedProperty m_onEnable;
            private UnityEditor.SerializedProperty m_onStart;
            private UnityEditor.SerializedProperty m_isAwake;
            private UnityEditor.SerializedProperty m_isEnable;
            private UnityEditor.SerializedProperty m_isStart;

            private void OnEnable()
            {
                m_onAwake = serializedObject.FindProperty("m_onAwake");
                m_onEnable = serializedObject.FindProperty("m_onEnable");
                m_onStart = serializedObject.FindProperty("m_onStart");
                m_isAwake = serializedObject.FindProperty("m_isAwake");
                m_isEnable = serializedObject.FindProperty("m_isEnable");
                m_isStart = serializedObject.FindProperty("m_isStart");
            }

            public override void OnInspectorGUI()
            {
                serializedObject.Update();

                if (m_isAwake.boolValue)
                {
                    UnityEditor.EditorGUILayout.PropertyField(m_onAwake);
                }
                if (m_isEnable.boolValue)
                {
                    UnityEditor.EditorGUILayout.PropertyField(m_onEnable);
                }
                if (m_isStart.boolValue)
                {
                    UnityEditor.EditorGUILayout.PropertyField(m_onStart);
                }

                GUILayout.BeginHorizontal();
                GUILayout.FlexibleSpace();
                if (GUILayout.Button("  Add Initialization Event  "))
                {
                    StartMenu(out UnityEditor.GenericMenu menu);
                    AddMenu(menu, "On Awake", m_isAwake.boolValue, () => {
                        if (m_isAwake.boolValue)
                        {
                            m_isAwake.boolValue = false;
                        }
                        else
                        {
                            m_isAwake.boolValue = true;
                        }
                        serializedObject.ApplyModifiedProperties();
                    });
                    AddMenu(menu, "On Enable", m_isEnable.boolValue, () => {
                        if (m_isEnable.boolValue)
                        {
                            m_isEnable.boolValue = false;
                        }
                        else
                        {
                            m_isEnable.boolValue = true;
                        }
                        serializedObject.ApplyModifiedProperties();
                    });
                    AddMenu(menu, "On Start", m_isStart.boolValue, () => {
                        if (m_isStart.boolValue)
                        {
                            m_isStart.boolValue = false;
                        }
                        else
                        {
                            m_isStart.boolValue = true;
                        }
                        serializedObject.ApplyModifiedProperties();
                    });
                    EndMenu(menu);
                }
                GUILayout.FlexibleSpace();
                GUILayout.EndHorizontal();

                serializedObject.ApplyModifiedProperties();
            }
            private void StartMenu(out UnityEditor.GenericMenu menu)
            {
                menu = new UnityEditor.GenericMenu();

            }
            private void AddMenu(UnityEditor.GenericMenu menu, string itemName, bool check, UnityEditor.GenericMenu.MenuFunction menuFunction)
            {
                menu.AddItem(new GUIContent(itemName), check, menuFunction);
            }
            private void EndMenu(UnityEditor.GenericMenu menu)
            {
                menu.ShowAsContext();
                GUIUtility.ExitGUI();
            }
        }
#endif
        #endregion
        [SerializeField] private UnityEvent m_onAwake;
        [SerializeField] private UnityEvent m_onEnable;
        [SerializeField] private UnityEvent m_onStart;

        [SerializeField] private bool m_isAwake;
        [SerializeField] private bool m_isEnable;
        [SerializeField] private bool m_isStart;
        private void Awake()
        {
            m_onAwake?.Invoke();
        }
        private void OnEnable()
        {
            m_onEnable?.Invoke();
        }
        private void Start()
        {
            m_onStart?.Invoke();
        }
    }

}