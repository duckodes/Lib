using UnityEngine;
using UnityEngine.Events;

namespace UGamie.Core.Event
{
    public class InitializationEvent : MonoBehaviour
    {
        #region Editor
#if UNITY_EDITOR
        [UnityEditor.CustomEditor(typeof(InitializationEvent))]
        public class BeginEventEditor : UnityEditor.Editor
        {
            private UnityEditor.SerializedProperty onAwake;
            private UnityEditor.SerializedProperty onEnable;
            private UnityEditor.SerializedProperty onStart;
            private UnityEditor.SerializedProperty isAwake;
            private UnityEditor.SerializedProperty isEnable;
            private UnityEditor.SerializedProperty isStart;

            private void OnEnable()
            {
                onAwake = serializedObject.FindProperty("onAwake");
                onEnable = serializedObject.FindProperty("onEnable");
                onStart = serializedObject.FindProperty("onStart");
                isAwake = serializedObject.FindProperty("isAwake");
                isEnable = serializedObject.FindProperty("isEnable");
                isStart = serializedObject.FindProperty("isStart");
            }

            public override void OnInspectorGUI()
            {
                serializedObject.Update();

                if (isAwake.boolValue)
                {
                    UnityEditor.EditorGUILayout.PropertyField(onAwake);
                }
                if (isEnable.boolValue)
                {
                    UnityEditor.EditorGUILayout.PropertyField(onEnable);
                }
                if (isStart.boolValue)
                {
                    UnityEditor.EditorGUILayout.PropertyField(onStart);
                }

                GUILayout.BeginHorizontal();
                GUILayout.FlexibleSpace();
                if (GUILayout.Button("  Add Initialization Event  "))
                {
                    StartMenu(out UnityEditor.GenericMenu menu);
                    AddMenu(menu, "On Awake", isAwake.boolValue, () => {
                        if (isAwake.boolValue)
                        {
                            isAwake.boolValue = false;
                        }
                        else
                        {
                            isAwake.boolValue = true;
                        }
                        serializedObject.ApplyModifiedProperties();
                    });
                    AddMenu(menu, "On Enable", isEnable.boolValue, () => {
                        if (isEnable.boolValue)
                        {
                            isEnable.boolValue = false;
                        }
                        else
                        {
                            isEnable.boolValue = true;
                        }
                        serializedObject.ApplyModifiedProperties();
                    });
                    AddMenu(menu, "On Start", isStart.boolValue, () => {
                        if (isStart.boolValue)
                        {
                            isStart.boolValue = false;
                        }
                        else
                        {
                            isStart.boolValue = true;
                        }
                        serializedObject.ApplyModifiedProperties();
                    });
                    EndMenu(menu);
                }
                GUILayout.FlexibleSpace();
                GUILayout.EndHorizontal();

                serializedObject.ApplyModifiedProperties();
            }
            private void StartMenu(Vector2 position, out UnityEditor.GenericMenu menu, out Vector2 menuPosition)
            {
                menuPosition = new Vector2(position.x, position.y);
                menu = new UnityEditor.GenericMenu();

            }
            private void StartMenu(out UnityEditor.GenericMenu menu)
            {
                menu = new UnityEditor.GenericMenu();

            }
            private void AddMenu(UnityEditor.GenericMenu menu, string itemName, bool check, UnityEditor.GenericMenu.MenuFunction menuFunction)
            {
                menu.AddItem(new GUIContent(itemName), check, menuFunction);
            }
            private void EndMenu(UnityEditor.GenericMenu menu, Vector2 menuPosition)
            {
                menu.ShowAsContext();
                menu.DropDown(new Rect(menuPosition.x, menuPosition.y, 0, 0));
                GUIUtility.ExitGUI();
            }
            
            private void EndMenu(UnityEditor.GenericMenu menu)
            {
                menu.ShowAsContext();
                GUIUtility.ExitGUI();
            }
        }
#endif
        #endregion
        [SerializeField] private UnityEvent onAwake;
        [SerializeField] private UnityEvent onEnable;
        [SerializeField] private UnityEvent onStart;

        [SerializeField] private bool isAwake;
        [SerializeField] private bool isEnable;
        [SerializeField] private bool isStart;
        private void Awake()
        {
            onAwake?.Invoke();
        }
        private void OnEnable()
        {
            onEnable?.Invoke();
        }
        private void Start()
        {
            onStart?.Invoke();
        }
    }

}