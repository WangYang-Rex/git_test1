# chrome插件 
### 快速上手  web开发者无门槛~

##基本概念

一个应用（扩展）其实是压缩在一起的一组文件，包括HTML，CSS，Javascript脚本，图片文件，还有其它任何需要的文件。 应用（扩展）本质上来说就是web页面，它们可以使用所有的浏览器提供的API，从XMLHttpRequest到JSON到HTML5全都有。

应用（扩展）可以与Web页面交互，或者通过content script或cross-origin XMLHttpRequests与服务器交互。应用（扩展）还可以访问浏览器提供的内部功能，例如标签或书签等。

##文件
每个应用（扩展）都应该包含下面的文件：
一个manifest文件
一个或多个html文件（除非这个应用是一个皮肤）
可选的一个或多个javascript文件
可选的任何需要的其他文件，例如图片
在开发应用（扩展）时，需要把这些文件都放到同一个目录下。发布应用（扩展）时，这个目录全部打包到一个应用（扩展）名是.crx的压缩文件中。如果使用Chrome Developer Dashboard,上传应用（扩展），可以自动生成.crx文件。

##引用文件
任何需要的文件都可以放到应用（扩展）中，但是怎么使用它们呢？一般的说，可以像在普通的HTML文件中那样使用相对地址来引用一个文件。下面的例子演示了如何引用images子目录下的文件myimage.png
<img src="images/myimage.png">

也可以用一个绝对路径来表示：
chrome-extension://<extensionID>/<pathToFile>
在这个URL中，是为每一个应用（扩展）生成的唯一ID。从chrome://extensions页面中可以看到已经安装的所有应用（扩展）的唯一ID。是文件在应用（扩展）目录下的路径，也就是它的相对路径。


##页面
背景页面并不是应用（扩展）中唯一的页面。例如，一个browser action可以包含一个弹窗(popup)，而弹窗就是用html页面实现的。应用（扩展）还可以使用chrome.tabs.create()或者window.open()来显示内部的HTML文件。
应用（扩展）里面的HTML页面可以互相访问各自DOM树中的全部元素，或者互相调用其中的函数。
<img src="http://img.qihoo.com/images/2008/360chrome/img/open/popup.gif"/>

##Content scripts
如果一个应用（扩展）需要与web页面交互，那么就需要使用一个content script。Content script脚本是指能够在浏览器已经加载的页面内部运行的javascript脚本。可以将content script看作是网页的一部分，而不是它所在的应用（扩展）的一部分。

Content script可以获得浏览器所访问的web页面的详细信息，并可以对页面做出修改。下图显示了一个content script可以读取并修改当前页面的DOM树。但是它并不能修改它所在应用（扩展）的背景页面的DOM树。
<img src="http://img.qihoo.com/images/2008/360chrome/img/open/content.gif"/>

Content script与它所在的应用（扩展）并不是完全没有联系。一个content script脚本可以与所在的应用（扩展）交换消息，如下图所示。例如，当一个content script从页面中发现一个RSS种子时，它可以发送一条消息。或者由背景页面发送一条消息，要求content script修改一个网页的内容。
<img src="http://img.qihoo.com/images/2008/360chrome/img/open/content1.gif"/>

##页面间的通信
一个应用（扩展）中的HTML页面间经常需要互相通信。由于一个应用（扩展）的所有页面是在同一个进程的同一个线程中运行的，因此它们之间可以直接互相调用各自的函数。

可以使用chrome.extension中的方法来获取应用（扩展）中的页面，例如getViews()和getBackgroundPage()。一旦一个页面得到了对应用（扩展）中其它页面的引用，它就可以调用被引用页面中的函数，并操作被引用页面的DOM树。


##调试
Web开发者都会的<span style="color:red">F12</span>~


##红杏 讲解
chrome.proxy.settings.set
`
var config = {
    mode: "fixed_servers",
    rules: {
        proxyForHttp: {
            scheme: "socks5",
            host: "1.2.3.4",
            port: 1080
        },
        proxyForHttps: {
            scheme: "socks5",
            host: "1.2.3.5",
            port: 1080
        },
        proxyForFtp: {
            scheme: "http",
            host: "1.2.3.6",
            port: 80
        }
        bypassList: ["foobar.com"]
    }
};
chrome.proxy.settings.set(
    {value: config},
    function() {
});
`

##作业
下载当前页面所有图片的扩展

## 参考资料 
http://doc.raycloud.com/pages/viewpage.action?pageId=17367106
http://blog.jobbole.com/46608/