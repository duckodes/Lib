using UnityEngine;

namespace UGamie.Menu
{
    /// <summary>
    /// This class Instantiate UnityEditor.GenericMenu
    /// By Easy Function.
    /// </summary>
    public class MenuGeneric
    {
        public void StartMenu(Vector2 position, out UnityEditor.GenericMenu menu, out Vector2 menuPosition)
        {
            menuPosition = new Vector2(position.x, position.y);
            menu = new UnityEditor.GenericMenu();

        }
        public void StartMenu(out UnityEditor.GenericMenu menu)
        {
            menu = new UnityEditor.GenericMenu();

        }
        public void AddMenu(UnityEditor.GenericMenu menu, string itemName, bool check, UnityEditor.GenericMenu.MenuFunction menuFunction)
        {
            menu.AddItem(new GUIContent(itemName), check, menuFunction);
        }
        public void AddDisabledMenu(UnityEditor.GenericMenu menu, string itemName, bool check)
        {
            menu.AddDisabledItem(new GUIContent(itemName), check);
        }
        public void EndMenu(UnityEditor.GenericMenu menu, Vector2 menuPosition)
        {
            menu.ShowAsContext();
            menu.DropDown(new Rect(menuPosition.x, menuPosition.y, 0, 0));
            GUIUtility.ExitGUI();
        }
        public void EndMenu(UnityEditor.GenericMenu menu)
        {
            menu.ShowAsContext();
            GUIUtility.ExitGUI();
        }
    }
}