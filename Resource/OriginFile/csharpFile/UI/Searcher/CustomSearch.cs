using UGamie.Core;
using UnityEngine;

public class CustomSearch : MonoBehaviour
{
    private Searcher m_searcher;
    // 要搜尋的資料
    [SerializeField] private string[] m_sources = new string[] { "ex1", "ex2", "ex3" };
    private void OnEnable()
    {
        m_searcher = new Searcher();
    }
    private void OnGUI()
    {
        // 使用Searcher.cs的方法Search，items是遍歷m_sources該數組的每項元素，會經由Search方法的Action<string>傳入
        m_searcher.m_keyword = GUILayout.TextField(m_searcher.m_keyword, GUILayout.Width(200));
        m_searcher.Search(m_sources, (items) =>
        {
            // 撰寫列出的每項m_sources資源，以unity api GUILayout.Button為例
            if (GUILayout.Button(items, GUILayout.Width(200)))
            {

            }
        });
    }
}