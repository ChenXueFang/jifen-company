using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Object
{
    public class FileHelper
    {

        public static void Write(string filename, string txt)
        {
            Write(filename, txt, Encoding.UTF8);
            //var fs = new FileStream(filename, FileMode.CreateNew);
            //StreamWriter m_streamWriter = new StreamWriter(fs, Encoding.UTF8);
            //m_streamWriter.Write(txt);
            //m_streamWriter.Flush();
            //m_streamWriter.Close();
        }
        public static void Write(string filename, string txt , Encoding encode)
        {
            
           
            var fs = new FileStream(filename, FileMode.CreateNew);
            StreamWriter m_streamWriter = new StreamWriter(fs, encode);
            m_streamWriter.Write(txt);
            m_streamWriter.Flush();
            m_streamWriter.Close();
           
        }
        public static string Read(string filename)
        {
            var fs = new FileStream(filename, FileMode.Open);
            using (StreamReader m_streamWriter = new StreamReader(fs, Encoding.UTF8)) {
                return m_streamWriter.ReadToEnd();
                ;
            }

        }
    }
}
