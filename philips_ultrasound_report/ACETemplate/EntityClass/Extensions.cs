using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Dynamic;
using System.Reflection;
using NHibernate.Criterion;

namespace EntityClass
{
    public static class Extensions
    {

        public static DataTable ToDateTable<T>(this IList<T> list, List<string> filter) where T : new()
        {
            DataTable dt = new DataTable();

            var t = new T();


            var plist = t.GetType().GetProperties().Where((a) => { return filter.FindIndex((b) => { return b == a.Name; }) == -1; });
            var m = plist.Select((a) => { return a.Name; });

            //创建colunmn
            foreach (var s in m)
            {
                dt.Columns.Add(new DataColumn(s));
            }
            foreach (var item in list)
            {
                DataRow dr = dt.NewRow();

                foreach (var v in plist.ToList())
                {
                    dr[v.Name] = v.GetValue(item);
                }
                dt.Rows.Add(dr);
            }
            return dt;

        }
        public static List<dynamic> ToList<dynamic>(this DataTable dt)
        {

            List<dynamic> list = new List<dynamic>();

            foreach (DataRow dr in dt.Rows)
            {
                list.Add(dr.ToDynamic(dt.Columns));
            }
            return list;

        }

        public static List<T> ToList<T>(this List<dynamic> list) where T : new()
        {
            List<T> lists = new List<T>();
            foreach (var dy in list)
            {
                //获取属性
                T t = new T();

                foreach (var v in t.GetType().GetProperties())
                {
                    IDictionary<string, object> result = dy;
                    int i;
                    if ((i = result.Keys.ToList().FindIndex(a => a == v.Name)) > -1)
                    {
                        if (result[v.Name] == DBNull.Value || result[v.Name] == null)
                        {
                            v.SetValue(t, null);
                        }
                        else
                            v.SetValue(t, result[v.Name]);
                        //  getPropertyInfoValue(v,]);
                    }
                }
                lists.Add(t);
            }

            return lists;
        }

        /// <summary>
        /// 获取属性值，并转换值类型
        /// </summary>
        /// <param name="v1"></param>
        /// <param name="obj"></param>
        /// <returns></returns>
        static object getPropertyInfoValue(this PropertyInfo v1, object obj)
        {
            try
            {
                if (v1.PropertyType == typeof(String))
                {
                    return (string)obj;
                }
                else if (v1.PropertyType == typeof(DateTime))
                {
                    return DateTime.Parse(obj.ToString());
                }
                else if (v1.PropertyType == typeof(DateTime?))
                {
                    return DateTime.Parse(obj.ToString());
                }
                else if (v1.PropertyType == typeof(bool))
                {
                    return Boolean.Parse(obj.ToString());


                }
                else if (v1.PropertyType == typeof(bool?))
                {
                    return (bool?)obj;

                }
                else if (v1.PropertyType == typeof(int))
                {
                    return int.Parse(obj.ToString());

                }

                else if (v1.PropertyType == typeof(int?))
                {
                    return (int?)obj;

                }
                else if (v1.PropertyType == typeof(long))
                {
                    return long.Parse(obj.ToString());


                }
                else if (v1.PropertyType == typeof(decimal))
                {

                    return decimal.Parse(obj.ToString());
                }

                else if (v1.PropertyType == typeof(float))
                {

                    return float.Parse(obj.ToString());
                }

                else if (v1.PropertyType == typeof(double))
                {

                    return double.Parse(obj.ToString());
                }
            }
            catch (Exception ex)
            {
                throw new Exception("数据格式不正确" + v1.Name + ": " + obj);
            }
            return null;

        }
        static dynamic ToDynamic(this DataRow dr, DataColumnCollection cl)
        {
            IDictionary<string, object> result = new ExpandoObject();
            for (int t = 0; t < cl.Count; t++)
            {

                result.Add(cl[t].ColumnName, dr[t]);
            }
            return result as ExpandoObject;
        }



        public static ICriterion ToandCriterion(this List<ICriterion> list)
        {
            ICriterion i = null;
            foreach (var l in list)
            {
                if (i == null)
                    i = l;
                else
                {
                    i = Expression.And(i, l);
                }
            }
            return i;
        }

        public static ICriterion ToorCriterion(this List<ICriterion> list)
        {
            ICriterion i = null;
            foreach (var l in list)
            {
                if (i == null)
                    i = l;
                else
                {
                    i = Expression.Or(i, l);
                }
            }
            return i;
        }
    }
}
