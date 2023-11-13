using System.Collections.Generic;
using UnityEngine;

public class AudioCollection : MonoBehaviour
{
    [SerializeField] private List<AudioCollector> m_audioCollector;
    [System.Serializable]
    public class AudioCollector
    {
        public AudioSource m_audioSource;
        public AudioClip m_audioClip;
    }
    public List<AudioCollector> GetAudioCollector() => m_audioCollector;
    public void Play(int index)
    {
        m_audioCollector[index].m_audioSource.clip = m_audioCollector[index].m_audioClip;
        m_audioCollector[index].m_audioSource.Play();
    }
    public void PlayOneShot(int index)
    {
        m_audioCollector[index].m_audioSource.PlayOneShot(m_audioCollector[index].m_audioClip);
    }
    public void PlayOneShotWhenNotPlaying(int index)
    {
        if (!m_audioCollector[index].m_audioSource.isPlaying)
        {
            m_audioCollector[index].m_audioSource.PlayOneShot(m_audioCollector[index].m_audioClip);
        }
    }
}