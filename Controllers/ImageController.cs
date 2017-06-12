using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using GalleryForStudent.Models;

namespace GalleryForStudent.Controllers
{
    public class ImageController : Controller
    {

        public ActionResult AddImage(HttpPostedFileBase file)
        {
            var fileName = file.FileName;
            var path = GetPathToImg(fileName);
            file.SaveAs(path);
            return RedirectToAction("Index", "Home");
        }

        public JsonResult AddImageAjax(string fileName, string data)
        {
            var dataIndex = data.IndexOf("base64", StringComparison.Ordinal) + 7;
            var cleareData = data.Substring(dataIndex);
            var fileData = Convert.FromBase64String(cleareData);
            var bytes = fileData.ToArray();

            var path = GetPathToImg(fileName);
            using (var fileStream = System.IO.File.Create(path))
            {
                fileStream.Write(bytes, 0, bytes.Length);
                fileStream.Close();
            }

            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetImages()
        {
            var serverPath = Server.MapPath("~");
            var pathToImageFolder = Path.Combine(serverPath, "Content", "img");
            var imageFiles = Directory.GetFiles(pathToImageFolder);
            var imges = imageFiles.Select(BuildImage);
            return Json(imges, JsonRequestBehavior.AllowGet);
        }

        private string GetPathToImg(string fileName)
        {
            var serverPath = Server.MapPath("~");
            return Path.Combine(serverPath, "Content", "img", fileName);
        }

        private Image BuildImage(string path)
        {
            var fileName = Path.GetFileName(path);
            var image = new Image
            {
                Url = Url.Content("~/Content/img/" + fileName),
                Name = Path.GetFileNameWithoutExtension(path),
                Extension = Path.GetExtension(path)   
            };

            return image;
        }
    }
}