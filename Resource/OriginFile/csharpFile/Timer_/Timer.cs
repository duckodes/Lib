using System;
using UnityEngine;

namespace UGamie.Core
{
    public class Timer
    {
        private float m_timer;
        public Timer()
        {
            m_timer = 0.0f;
        }
        public void Update(Action action, float m_Per)
        {
            m_timer += Time.deltaTime;
            if (m_timer >= m_Per)
            {
                action();
                m_timer = 0.0f;
            }
        }
        public void Update(Action<float> action, float m_Per)
        {
            m_timer += Time.deltaTime;
            if (m_timer >= m_Per)
            {
                action(m_timer);
                m_timer = 0.0f;
            }
        }
    }
}