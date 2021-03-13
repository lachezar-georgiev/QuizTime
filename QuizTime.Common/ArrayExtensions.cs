using System;

namespace QuizTime.Common
{
    public static class ArrayExtensions
    {
        public static T[] Shuffle<T>(this T[] source, Random random)
        {
            int n = source.Length;
            while (n > 1)
            {
                int k = random.Next(n--);
                T temp = source[n];
                source[n] = source[k];
                source[k] = temp;
            }

            return source;
        }
    }
}
