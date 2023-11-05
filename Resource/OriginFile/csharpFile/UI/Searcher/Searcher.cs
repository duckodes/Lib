using System;

namespace UGamie.Core
{
    /// <summary>
    /// Verion.1.0.0
    /// Source: https://bearhubs.github.io/Profolio/main.html
    /// </summary>
    /// 
    /// <copyright file = "Searcher.cs" company = "UGsoft LLC">
    /// Copyright (C) 2023 UGamie LLC. With Copyright (C) 2023 UGsoft LLC. All rights reserved.
    /// </copyright>
    /// 
    /// <author>
    /// ugamiestudio@gmail.com
    /// </author>
    public class Searcher
    {
        public string m_keyword { get; set; }
        public Searcher()
        {
            m_keyword = string.Empty;
        }
        public void Search(string[] source, Action<string> action, StringComparison stringComparison = StringComparison.OrdinalIgnoreCase)
        {
            foreach (string item in source)
            {
                if (item.Contains(m_keyword, stringComparison))
                {
                    action(item);
                }
            }
        }
    }
}