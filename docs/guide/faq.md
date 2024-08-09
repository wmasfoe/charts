# 常见问题
**1. 图表渲染不出来？**

a. 检查是否配置了chartData, dimensions, metrics等required配置项,delight charts不传入这些配置项会渲染不出来哦

b. 尽量不要将图表库配置项和echarts原生配置方式混用，合并的时候会出现一些意想不到的结果，delight charts认为你传了chartData, dimensions, metrics这些配置项在合并的时候会以图表库api转化结果为准，如果不传这些配置项，会以echarts配置项为准，所以尽量不要混用，二者选其一都可



**2. 是否支持echarts原生配置？**

支持，delight charts会将echarts原生配置和图表库支持的配置合并，同名属性以delight charts的为准，非同名属性直接新增

**3. delight charts是否支持自定义主题？**

支持，直接传入注册完成的theme就ok，就能完成自定义主题
