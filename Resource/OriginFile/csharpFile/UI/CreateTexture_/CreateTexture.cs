using UnityEngine;

namespace UGamie.Core
{
    public class CreateTexture
    {
        public Texture2D MakeTex(int width, int height, Color color)
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
    }
}