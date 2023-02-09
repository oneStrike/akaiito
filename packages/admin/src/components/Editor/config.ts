import 'tinymce/plugins/advlist'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/help'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/image'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/noneditable'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/print'
import 'tinymce/plugins/save'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/tabfocus'
import 'tinymce/plugins/table'
import 'tinymce/plugins/template'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/wordcount'
import config from '@/config'
import { useUserStore } from '@/stores'

const plugins = [
  'advlist anchor autolink autoresize autosave charmap code codesample directionality fullscreen help hr image insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace tabfocus table template textpattern visualblocks visualchars wordcount'
]

const toolbar = [
  'searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent blockquote undo redo removeformat subscript superscript code codesample help',
  'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons charmap forecolor backcolor fullpage fullscreen'
]

//图片上传
const uploadImage = function (blobInfo: any, succFun: any, failFun: any) {
  const file = blobInfo.blob() //转化为易于理解的file对象
  const xhr = new XMLHttpRequest()
  xhr.withCredentials = false
  xhr.open('POST', config.UPLOAD_URL)
  xhr.onload = function () {
    if (xhr.status != 200) {
      failFun('HTTP Error: ' + xhr.status)
      return
    }
    const json = JSON.parse(xhr.responseText)

    if (!json || json.code !== 1) {
      failFun('上传失败: ' + json.desc)
      return
    }
    const filePath = config.FILE_PATH + json.data[0].path
    succFun(filePath)
  }
  const formData = new FormData()
  formData.append('filename', file, file.name)
  formData.append('fileType', 'editor')
  xhr.setRequestHeader('Authorization', useUserStore().auth.token)
  xhr.send(formData)
}

export const tinymceConfig = {
  elector: '',
  language: 'zh_CN',
  width: '100%',
  height: '660px',
  resize: 'both',
  language_url: `${import.meta.env.BASE_URL}tinymce/langs/zh-cn.js`,
  skin_url: `${import.meta.env.BASE_URL}tinymce/skins/ui/oxide`,
  menubar: true,
  content_css: '',
  font_formats:
    'Arial=arial,helvetica,sans-serif; 宋体=SimSun; 微软雅黑=Microsoft Yahei; Impact=impact,chicago;', //字体
  fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px 64px 72px', //文字大小
  paste_webkit_styles: 'all',
  paste_merge_formats: true,
  nonbreaking_force_tab: false,
  paste_auto_cleanup_on_paste: false,
  file_picker_types: 'file',
  placeholder: '请输入内容',
  images_upload_handler: uploadImage,
  plugins,
  toolbar
}
