using UnityEngine;

#if UNITY_EDITOR
using UnityEditor;
namespace UGamie.Menu
{
    /// <summary>
    /// This class Instantiate UnityEditor.GenericMenu
    /// By Easy Function.
    /// </summary>
    public class MenuGeneric
    {
        public void StartMenu(Vector2 position, out GenericMenu menu, out Vector2 menuPosition)
        {
            menuPosition = new Vector2(position.x, position.y);
            menu = new GenericMenu();

        }
        public void StartMenu(out GenericMenu menu)
        {
            menu = new GenericMenu();

        }
        public void AddMenu(GenericMenu menu, string itemName, bool check, GenericMenu.MenuFunction menuFunction)
        {
            menu.AddItem(new GUIContent(itemName), check, menuFunction);
        }
        public void AddDisabledMenu(GenericMenu menu, string itemName, bool check)
        {
            menu.AddDisabledItem(new GUIContent(itemName), check);
        }
        public void EndMenu(GenericMenu menu, Vector2 menuPosition)
        {
            menu.ShowAsContext();
            menu.DropDown(new Rect(menuPosition.x, menuPosition.y, 0, 0));
            GUIUtility.ExitGUI();
        }
        public void EndMenu(GenericMenu menu)
        {
            menu.ShowAsContext();
            GUIUtility.ExitGUI();
        }
    }
}
#endif