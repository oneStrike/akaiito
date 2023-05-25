import 'tinymce/themes/silver'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default'
import 'tinymce/models/dom/model.js'

import 'tinymce/plugins/advlist'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/image'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/save'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/table'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/wordcount'

import config from '@/config'
import { uploadFileApi } from '@/api/common'
import { useMessage } from '@/hook/naviaDiscreteApi'
import type { RawEditorOptions } from 'tinymce'

const plugins =
  'advlist anchor autolink autoresize autosave charmap directionality fullscreen image insertdatetime link lists nonbreaking pagebreak save searchreplace table visualblocks visualchars preview wordcount'

const toolbar = [
  'searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent blockquote undo redo removeformat subscript superscript code codesample',
  'bullist numlist link image preview anchor pagebreak insertdatetime media table emoticons charmap forecolor backcolor fullscreen'
]

//图片上传
const uploadImage = async (blobInfo: any): Promise<string> => {
  return new Promise((resolve) => {
    const file = blobInfo.blob() //转化为易于理解的file对象
    const formData = new FormData()
    formData.append('filename', file, file.name)
    formData.append('fileClassify', 'editor')
    uploadFileApi(formData)
      .then((data) => {
        resolve(config.FILE_PATH + data[0].path)
      })
      .catch((err) => {
        useMessage.error(err.desc)
      })
  })
}
export const tinymceConfig: RawEditorOptions = {
  elector: '',
  language: 'zh-Hans',
  width: '100%',
  max_height: 480,
  resize: false,
  language_url: `${import.meta.env.BASE_URL}tinymce/langs/zh-Hans.js`,
  skin_url: `${import.meta.env.BASE_URL}tinymce/skins/ui/oxide`,
  menubar: true,
  content_css: `${
    import.meta.env.BASE_URL
  }tinymce/skins/content/default/content.min.css`,
  placeholder: '请输入内容',
  promotion: false,
  branding: false,
  paste_data_images: true,
  images_upload_handler: uploadImage,
  toolbar,
  plugins
}
