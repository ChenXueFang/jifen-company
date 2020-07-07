using System;
using System.Collections.Generic;
using System.Text;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;

namespace Com.Utility.ImageIO
{




    public class Thumbnail
    {
        public Thumbnail()
        {

        }

        /// <summary>
        /// 图片无损缩放
        /// </summary>
        /// <param name="sourceFile">图片源路径
        /// <param name="destFile">缩放后图片输出路径
        /// <param name="destHeight">缩放后图片高度
        /// <param name="destWidth">缩放后图片宽度
        /// <returns></returns>
        public static bool GetThumbnail(string sourceFile, string destFile, int destHeight, int destWidth)
        {
            System.Drawing.Image imgSource = System.Drawing.Image.FromFile(sourceFile);
            System.Drawing.Imaging.ImageFormat thisFormat = imgSource.RawFormat;
            int sW = 0, sH = 0;
            // 按比例缩放
            int sWidth = imgSource.Width;
            int sHeight = imgSource.Height;

            if (sHeight > destHeight || sWidth > destWidth)
            {
                if ((sWidth * destHeight) > (sHeight * destWidth))
                {
                    sW = destWidth;
                    sH = (destWidth * sHeight) / sWidth;
                }
                else
                {
                    sH = destHeight;
                    sW = (sWidth * destHeight) / sHeight;
                }
            }
            else
            {
                sW = sWidth;
                sH = sHeight;
            }

            Bitmap outBmp = new Bitmap(destWidth, destHeight);
            Graphics g = Graphics.FromImage(outBmp);
            g.Clear(Color.WhiteSmoke);

            // 设置画布的描绘质量
            g.CompositingQuality = CompositingQuality.HighQuality;
            g.SmoothingMode = SmoothingMode.HighQuality;
            g.InterpolationMode = InterpolationMode.HighQualityBicubic;

            g.DrawImage(imgSource, new Rectangle((destWidth - sW) / 2, (destHeight - sH) / 2, sW, sH), 0, 0, imgSource.Width, imgSource.Height, GraphicsUnit.Pixel);
            g.Dispose();

            // 以下代码为保存图片时，设置压缩质量
            EncoderParameters encoderParams = new EncoderParameters();
            long[] quality = new long[1];
            quality[0] = 100;

            EncoderParameter encoderParam = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, quality);
            encoderParams.Param[0] = encoderParam;

            try
            {
                //获得包含有关内置图像编码解码器的信息的ImageCodecInfo 对象。
                ImageCodecInfo[] arrayICI = ImageCodecInfo.GetImageEncoders();
                ImageCodecInfo jpegICI = null;
                for (int x = 0; x < arrayICI.Length; x++)
                {
                    if (arrayICI[x].FormatDescription.Equals("JPEG"))
                    {
                        jpegICI = arrayICI[x];//设置JPEG编码
                        break;
                    }
                }

                if (jpegICI != null)
                {
                    outBmp.Save(destFile, jpegICI, encoderParams);
                }
                else
                {
                    outBmp.Save(destFile, thisFormat);
                }

                return true;
            }
            catch
            {
                return false;
            }
            finally
            {
                imgSource.Dispose();
                outBmp.Dispose();
            }
        }





        /// <summary>
        /// Resize图片
        /// </summary>
        /// <param name="bmp">原始Bitmap
        /// <param name="newW">新的宽度
        /// <param name="newH">新的高度
        /// <param name="Mode">保留着，暂时未用
        /// <returns>处理以后的图片</returns>
        public static Bitmap ResizeImage(Bitmap bmp, int newW, int newH, int Mode)
        {
            try
            {
                Bitmap b = new Bitmap(newW, newH);
                Graphics g = Graphics.FromImage(b);

                // 插值算法的质量
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;

                g.DrawImage(bmp, new Rectangle(0, 0, newW, newH), new Rectangle(0, 0, bmp.Width, bmp.Height), GraphicsUnit.Pixel);
                g.Dispose();

                return b;
            }
            catch
            {
                return null;
            }
        }



        // ===============================

        /// <summary>
        /// 剪裁 -- 用GDI+
        /// </summary>
        /// <param name="b">原始Bitmap
        /// <param name="StartX">开始坐标X
        /// <param name="StartY">开始坐标Y
        /// <param name="iWidth">宽度
        /// <param name="iHeight">高度
        /// <returns>剪裁后的Bitmap</returns>
        public static Bitmap CutImage(Bitmap b, int StartX, int StartY, int iWidth, int iHeight)
        {
            if (b == null)
            {
                return null;
            }

            int w = b.Width;
            int h = b.Height;

            if (StartX >= w || StartY >= h)
            {
                return null;
            }

            if (StartX + iWidth > w)
            {
                iWidth = w - StartX;
            }

            if (StartY + iHeight > h)
            {
                iHeight = h - StartY;
            }

            try
            {
                Bitmap bmpOut = new Bitmap(iWidth, iHeight, PixelFormat.Format24bppRgb);

                Graphics g = Graphics.FromImage(bmpOut);
                g.DrawImage(b, new Rectangle(0, 0, iWidth, iHeight), new Rectangle(StartX, StartY, iWidth, iHeight), GraphicsUnit.Pixel);
                g.Dispose();

                return bmpOut;
            }
            catch
            {
                return null;
            }
        }

        //注意到区别了吗？提示，g.DrawImage中第二个new Rectangle。

        //目标其实都是new Rectangle(0, 0, iWidth, iHeight)，缩放算法把整个原始图都往目标区域里塞new Rectangle(0, 0, bmp.Width, bmp.Height)，而剪裁只是把原始区域上等宽等高的那个区域new Rectangle(StartX, StartY, iWidth, iHeight)1:1的塞到目标区域里。很容易吧。
        //************************************************************//
        //下面给出三个简单的方法，后面两个方法是扩展，估计有时用得着
        //************************************************************//
        /// <summary>
        /// 缩小图片
        /// </summary>
        /// <param name="strOldPic">源图文件名(包括路径)
        /// <param name="strNewPic">缩小后保存为文件名(包括路径)
        /// <param name="intWidth">缩小至宽度
        /// <param name="intHeight">缩小至高度
        public void SmallPic(string strOldPic, string strNewPic, int intWidth, int intHeight)
        {

            System.Drawing.Bitmap objPic, objNewPic;
            try
            {
                objPic = new System.Drawing.Bitmap(strOldPic);
                objNewPic = new System.Drawing.Bitmap(objPic, intWidth, intHeight);
                objNewPic.Save(strNewPic);

            }
            catch (Exception exp) { throw exp; }
            finally
            {
                objPic = null;
                objNewPic = null;
            }
        }

        /// <summary>
        /// 按比例缩小图片，自动计算高度
        /// </summary>
        /// <param name="strOldPic">源图文件名(包括路径)
        /// <param name="strNewPic">缩小后保存为文件名(包括路径)
        /// <param name="intWidth">缩小至宽度
        public void SmallPicw(string strOldPic, string strNewPic, int intWidth)
        {

            System.Drawing.Bitmap objPic, objNewPic;
            try
            {
                objPic = new System.Drawing.Bitmap(strOldPic);
                int intHeight = (intWidth / objPic.Width) * objPic.Height;
                objNewPic = new System.Drawing.Bitmap(objPic, intWidth, intHeight);
                objNewPic.Save(strNewPic);

            }
            catch (Exception exp) { throw exp; }
            finally
            {
                objPic = null;
                objNewPic = null;
            }
        }


        /// <summary>
        /// 按比例缩小图片，自动计算宽度
        /// </summary>
        /// <param name="strOldPic">源图文件名(包括路径)
        /// <param name="strNewPic">缩小后保存为文件名(包括路径)
        /// <param name="intHeight">缩小至高度
        public void SmallPich(string strOldPic, string strNewPic, int intHeight)
        {

            System.Drawing.Bitmap objPic, objNewPic;
            try
            {
                objPic = new System.Drawing.Bitmap(strOldPic);
                int intWidth = (intHeight / objPic.Height) * objPic.Width;
                objNewPic = new System.Drawing.Bitmap(objPic, intWidth, intHeight);
                objNewPic.Save(strNewPic);

            }
            catch (Exception exp) { throw exp; }
            finally
            {
                objPic = null;
                objNewPic = null;
            }
        }


        //************************************************************//

        public static void ImageCutZoomSize(string filepath, string destFilePath, int destWidth, int destHeight)
        {
            System.IO.Stream str = new System.IO.FileStream(filepath,System.IO.FileMode.Open);
            using (str)
            {
                ImageCutZoomSize(str,destFilePath,destWidth,destHeight);
            }
        }
        /// <summary>
        /// 按原图比例缩放，居中，多余的裁剪，图像之间留间距 
        /// </summary>
        /// <param name="sourceFile">
        /// <param name="destFilePath">
        /// <param name="destWidth">
        /// <param name="destHeight">
        public static void ImageCutZoomSize(System.IO.Stream sourceFile, string destFilePath, int destWidth, int destHeight)
        {
            try
            {
                //源图片
                System.Drawing.Image bmp = System.Drawing.Bitmap.FromStream(sourceFile);
                System.Drawing.Imaging.ImageFormat thisFormat = bmp.RawFormat;



                int w = bmp.Width;
                int h = bmp.Height;

                //int x = 0;
                //int y = 300;

                //图像之间留2个像素间距 y += 1;
                destHeight -= 2;
                destWidth -= 2;
                //计算图片宽高比
                double ratio_img = (double)w / h;
                double ratio_blk = (double)destWidth / destHeight; //0.44270833

                int img_x = 0, img_y = 1;
                int cut_w = w, cut_h = h;

                if (ratio_img >= ratio_blk)
                {
                    //宽图片，求img_x
                    cut_w = (int)Math.Round(h * ratio_blk);
                    img_x += (w - cut_w) / 2;
                }
                else
                {
                    //高图片，求img_y
                    cut_h = (int)Math.Round(w / ratio_blk);
                    img_y += (h - cut_h) / 2;
                }

                /*//裁剪后新的值
                int img_x = 0, img_y = 1;
                int cut_w = w, cut_h = h;
                */
                //System.Windows.Forms.MessageBox.Show("img_x" + img_x + "," +
                //    "img_y" + img_y + "," +
                //    "cut_w" + cut_w + "," +
                //    "cut_h" + cut_h + ",裁剪后新的值");

                //Image cbmp = CutImage(bmp, img_x, img_y, cut_w, cut_h);
                //if (bmp == null)//Image bmp
                //{
                //    return null;
                //}

                //int w = bmp.Width;
                //int h = bmp.Height;

                //if (img_x >= w || img_y >= h)
                //{
                //    return null;
                //}

                if (img_x + cut_w > w)
                {
                    cut_w = w - img_x;
                }

                if (img_y + cut_h > h)
                {
                    cut_h = h - img_y;
                }


                //加入大于尺寸就保持要求尺寸


                //裁剪
                Image bmpOut = new Bitmap(cut_w, cut_h, PixelFormat.Format24bppRgb);

                Graphics gcut = Graphics.FromImage(bmpOut);
                gcut.DrawImage(bmp, new Rectangle(0, 0, cut_w, cut_h), new Rectangle(img_x, img_y, cut_w, cut_h), GraphicsUnit.Pixel);
                gcut.Dispose();
                //bmpOut.Save(@"E:/19gcut.jpg");
                //裁剪 完成  
                ////缩放 
                //目标图片 
                Image destImg = new Bitmap(destWidth, destHeight);
                Graphics gresize = Graphics.FromImage(destImg);
                gresize.Clear(Color.Black);
                // 插值算法的质量 设置画布的描绘质量
                gresize.CompositingQuality = CompositingQuality.HighQuality;
                gresize.SmoothingMode = SmoothingMode.HighQuality;
                gresize.InterpolationMode = InterpolationMode.HighQualityBicubic;

                gresize.DrawImage(bmpOut, new Rectangle(0, 0, destWidth, destHeight), new Rectangle(0, 0, bmpOut.Width, bmpOut.Height), GraphicsUnit.Pixel);
                gresize.Dispose();
                //destImg.Save(@"E:/19resizet.jpg");//ok
                ////缩放完成


                // 以下代码为保存图片时，设置压缩质量
                EncoderParameters encoderParams = new EncoderParameters();
                long[] quality = new long[1];
                quality[0] = 100;

                EncoderParameter encoderParam = new EncoderParameter(System.Drawing.Imaging.Encoder.Quality, quality);
                encoderParams.Param[0] = encoderParam;


                //获得包含有关内置图像编码解码器的信息的ImageCodecInfo 对象。
                ImageCodecInfo[] arrayICI = ImageCodecInfo.GetImageEncoders();
                ImageCodecInfo jpegICI = null;
                for (int a = 0; a < arrayICI.Length; a++)
                {
                    if (arrayICI[a].FormatDescription.Equals("JPEG"))
                    {
                        jpegICI = arrayICI[a];//设置JPEG编码
                        break;
                    }
                }

                if (jpegICI != null)
                {
                    destImg.Save(destFilePath, jpegICI, encoderParams);
                }
                else
                {
                    destImg.Save(destFilePath, thisFormat);
                }
                /*****************/


                bmp.Dispose();
                bmpOut.Dispose();
                destImg.Dispose();


            }
            catch (Exception ex)
            {
                throw ex;
            }
            //finally
            //{
            //    bmp.Dispose();
            //    bitmap.Dispose();
            //} 
        }

    }






}
