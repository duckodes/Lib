using System.Collections.Generic;
using UnityEngine;

public class AudioCollection : MonoBehaviour
{
    [SerializeField] private List<AudioCollector> audioCollector;
    [System.Serializable]
    public class AudioCollector
    {
        public AudioSource audioSource;
        public AudioClip audioClip;
    }
    public List<AudioCollector> GetAudioCollector() => audioCollector;
    public void Play(int index)
    {
        audioCollector[index].audioSource.clip = audioCollector[index].audioClip;
        audioCollector[index].audioSource.Play();
    }
    public void PlayOneShot(int index)
    {
        audioCollector[index].audioSource.PlayOneShot(audioCollector[index].audioClip);
    }
    public void PlayOneShotWhenNotPlaying(int index)
    {
        if (!audioCollector[index].audioSource.isPlaying)
        {
            audioCollector[index].audioSource.PlayOneShot(audioCollector[index].audioClip);
        }
    }
}