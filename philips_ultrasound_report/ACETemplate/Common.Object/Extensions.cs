using System;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.Linq;
using System.Reflection;

namespace Common.Object
{
    public static class Extensions
    {
        public static string toJSON<T>(this T obj)
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(obj);
        }

      public static T JsonToObject<T>(this String str) {
            return Newtonsoft.Json.JsonConvert.DeserializeObject<T>(str);
        }
 /// <summary>
        /// copy属性
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <typeparam name="T1"></typeparam>
        /// <param name="t"></param>
        /// <returns></returns>
        public static T1 CopyProperty<T, T1 >(this T t) where T  :new() where T1 : new()
        {
            T1 t1 = new T1();
            var s = t1.GetType().GetProperties(BindingFlags.Public| BindingFlags.Instance);
            foreach (var s1 in s)
            {
                var ps = t.GetType().GetProperty(s1.Name, BindingFlags.Public | BindingFlags.Instance);
                if (ps != null)
                    s1.SetValue(t1, ps.GetValue(t));
            }
            return t1;
        }
    }
}