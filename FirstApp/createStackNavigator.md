## [createStackNavigator](http://coding.imooc.com/class/304.html)

`createStackNavigator `提供APP屏幕之间切换的能力，它是以栈的形式还管理屏幕之间的切换，新切换到的屏幕会放在栈的顶部。

### [屏幕转场风格](http://coding.imooc.com/class/304.html)

默认情况下，createStackNavigator提供了转场过渡效果，在Android和iOS上过渡效果是不同的，**这也是React Native重平台性的一个体现**，在Android上从屏幕底部淡入，在iOS上是从屏幕的右侧划入，当然你也可以通过配置让StackNavigator支持屏幕从底部滑入的效果。

### [createStackNavigator API](http://coding.imooc.com/class/304.html)

*createStackNavigator(RouteConfigs, StackNavigatorConfig):*

- `RouteConfigs`(必选)：路由配置对象是从路由名称到路由配置的映射，告诉导航器该路由呈现什么。
- `StackNavigatorConfig`(可选)：配置导航器的路由(如：默认首屏，navigationOptions，paths等)样式(如，转场模式mode、头部模式等)。

从createStackNavigator API上可以看出`createStackNavigator `支持通过`RouteConfigs`和 `StackNavigatorConfig`两个参数来创建createStackNavigator导航器。



#### [RouteConfigs](http://coding.imooc.com/class/304.html)

RouteConfigs支持三个参数`screen`、`path`以及`navigationOptions`；

- `screen`(必选)：指定一个 React 组件作为屏幕的主要显示内容，当这个组件被createStackNavigator加载时，它会被分配一个`navigation` prop。
- `path`(可选)：用来设置支持schema跳转时使用，具体使用会在下文的有关`Schema`章节中讲到；
- `navigationOptions`(可选)：用以配置全局的屏幕导航选项如：title、headerRight、headerLeft等；



#### [StackNavigatorConfig](http://coding.imooc.com/class/304.html)

从`react-navigation`源码中可以看出StackNavigatorConfig支持配置的参数有10个。

```js
function createStackNavigator(routeConfigMap, stackConfig = {}) {
  const {
    initialRouteKey,
    initialRouteName,
    initialRouteParams,
    paths,
    navigationOptions,
    disableKeyboardHandling,
    getCustomActionCreators
  } = stackConfig;
  ...
```

这7个参数可以根据作用不同分为路由配置、视图样式配置两类，首先看用于路由配置的参数：

*用于路由配置的参数：*

- initialRouteName: 设置默认的页面组件，必须是上面已注册的页面组件。
- initialRouteParams: 初始路由的参数。
- navigationOptions: 屏幕导航的默认选项，下文会详细讲解。
- initialRouteKey - 初始路由的可选标识符。
- paths: 用来设置支持schema跳转时使用，具体使用会在下文的有关`Schema`章节中讲到。

*用于导航样式配置的参数：*

- mode: 页面切换模式: 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
  - card: 普通app常用的左右切换。
  - modal: 上下切换。
- headerMode: 导航栏的显示模式: screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏。
  - float: 无透明效果, 默认。
  - screen: 有渐变透明效果, 如微信QQ的一样。
  - none: 隐藏导航栏。
- headerBackTitleVisible : 提供合理的默认值以确定后退按钮标题是否可见，但如果要覆盖它，则可以使用true或` false 在此选项中。
  - fade-in-place: 标题组件交叉淡入淡出而不移动，类似于iOS的Twitter，Instagram和Facebook应用程序。 这是默认值。
  - uikit: iOS的默认行为的近似值。 headerTransitionPreset: 指定在启用headerMode：float时header应如何从一个屏幕转换到另一个屏幕。
- cardStyle: 样式（iOS上页面切换会有白色渐变蒙层，想去掉则可以这样设置，cardStyle: { opacity: null },切换页面时的页面边框也在这里可以设置）。
- onTransitionStart: 页面切换开始时的回调函数 (我们可以在这里注册一些通知，告知我们切面切换的状态，方便后面处理页面切换事件)。
- onTransitionEnd: 页面切换结束时的回调函数。



#### [navigationOptions（屏幕导航选项）](http://coding.imooc.com/class/304.html)

支持一下参数：

- title: 可以作为headerTitle的备选字段(当没设置headerTitle时会用该字段作为标题)，也可以作为TabNavigator的tabBarLabel以及DrawerNavigator的drawerLabel。
- header: 自定义导航条，可以通过设置null来隐藏导航条；
- headerTitle: 标题；
- headerTitleAllowFontScaling: 标题是否允许缩放，默认true；
- headerBackTitle: 定义在iOS上当前页面进入到下一页面的回退标题，可以通过设置null来禁用它；
- headerTruncatedBackTitle: 当回退标题不能显示的时候显示此属性的标题，比如回退标题太长了；
- headerBackImage：React 元素或组件在标题的后退按钮中显示自定义图片。 当组件被调用时，它会在渲染时收到许多 props 如：（tintColor，title）。 默认为带有 react-navigation/views/assets/back-icon.png 这张图片的组件，后者是平台的默认后图标图像（iOS上为向左的符号，Android上为箭头）。
- headerRight: 定义导航栏右边视图；
- headerLeft: 定义导航栏左边视图；
- headerStyle: 定义导航栏的样式，比如背景色等；
- headerTitleStyle: 定义标题的样式；
- headerLeftContainerStyle：自定义 headerLeft 组件容器的样式，例如，增加 padding。
- headerRightContainerStyle：自定义 headerRight 组件容器的样式,，例如，增加 padding。
- headerTitleContainerStyle：自定义 headerTitle 组件容器的样式, 例如，增加 padding。
- headerBackTitleStyle: 定义返回标题的样式；
- headerPressColorAndroid：颜色为材料波纹 (Android >= 5.0)；
- headerTintColor: 定义导航条的tintColor，会覆盖headerTitleStyle中的颜色；
- headerTransparent：默认为 false。如果 true, 则标头将不会有背景, 除非您显式提供 headerStyle 或 headerBackground。
- headerBackground：与headerTransparent一起使用，以提供在标题后台呈现的组件。 例如，您可以使用模糊视图来创建半透明标题。
- gesturesEnabled: 定义是否能侧滑返回，iOS默认true，Android默认false；
- gestureResponseDistance: 定义滑动返回的有效距离，水平状态下默认：25，垂直状态默认135；
- gestureDirection: 设置关闭手势的方向。默认从左向右，可以设置从右到左的滑动操作。