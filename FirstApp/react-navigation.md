react-navigation的出现替代了Navigator、 Ex-Navigation等老一代的导航组件，react-navigation可以说是Navigator的加强版，不仅有Navigator的全部功能，另外还支持底部导航类似于与iOS中的UITabBarController，此外它也支持侧拉效果方式的导航类似于Android中的抽屉效果。

## 什么是导航器？

导航器也可以看成一个是普通的React组件，你可以通过导航器来定义你的App的导航结构。 导航器还可以渲染通用元素，例如可以配置的标题栏和选项卡栏。

在react-navigation中有以下三种类型的导航器：

1.StackNavigator: 类似于普通的Navigator，屏幕上方导航栏；

2.TabNavigator: 相当于iOS里面的TabBarController，屏幕下方的标签栏；

3.DrawerNavigator: 抽屉效果，侧边滑出；

![react-navigation](https://www.devio.org/img/teach/react-navigation/react-navigation.png)



在开始学习三种导航器之前，我们需要先了解两个和导航关于概念：

1.`Screen navigation prop(屏幕导航属性)`：通过navigation可以完成屏幕之间的调度操作，例如打开另一个屏幕；

2.`Screen navigationOptions(屏幕导航选项)`： 通过navigationOptions可以定制导航器显示屏幕的方式（例如：头部标题，选项卡标签等）；



### 导航器所支持的Props

```js
const SomeNav = StackNavigator/TabNavigator/DrawerNavigator({
  // config
});

<SomeNav
  screenProps={xxx}
  ref={nav => { navigation = nav; }}
  onNavigationStateChange=(prevState, newState, action)=>{
  	
  }
/>
```

1.ref：可以通过`ref`属性获取到`navigation`；

2.onNavigationStateChange(prevState, newState, action)：顶级节点除了`ref`属性之外，还接受`onNavigationStateChange(prevState, newState, action)`属性，每次当导航器所管理的`state`发生改变时，都会回调该方法；

- prevState：变化之前的state；
- newState：新的state；
- 导致state变化的action；

3.screenProps：向子屏幕传递额外的数据，子屏幕可以通过this.props.screenProps获取到该数据。



## Screen Navigation Prop(屏幕的navigation Prop)

当导航器中的屏幕被打开时，它会收到一个`navigation` prop，`navigation` prop是整个导航环节的关键一员，接下来就详细讲解一下`navigation`的作用。

**navigation包含一下功能：**

- navigate：跳转到其他界面；
- state：屏幕的当前state；
- setParams：改变路由的params；
- goBack：关闭当前屏幕；
- dispatch：向路由发送一个action；

*注意：一个navigation有可能没有navigate、setParams以及goBack，只有state与dispatch，所以在使用navigate时要进行判断，如果没有navigate可以使用navigation去dispatch一个新的action。如：*

```js
const {navigation,theme,selectedTab}=this.props;
const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({
            routeName: 'HomePage',
            params:{
                theme:theme,
                selectedTab:selectedTab
            },
        })
    ]
})
navigation.dispatch(resetAction)
```





## 使用navigate进行界面之间的跳转

navigate(routeName, params, action)

- routeName：要跳转到的界面的路由名，也就是在导航其中配置的路由名；
- params：要传递给下一个界面的参数；
- action：如果该界面是一个navigator的话，将运行这个sub-action。

```js
export const AppStackNavigator = StackNavigator({
    HomeScreen: {
        screen: HomeScreen
    },
    Page1: {
        screen: Page1
    })

class HomeScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;

    return (
      <View>
        <Text>This is HomeScreen</Text>
        <Button
          onPress={() => navigate('Page1', {name: 'Devio'})}
          title="Go to Page1"
        />
      </View>
     )
   }
}
```





## 使用state的params

可以通过this.props.state.params来获取通过`setParams()`，或`navigation.navigate()`传递的参数。

```js
<Button
    title={params.mode === 'edit' ? '保存' : '编辑'}
    onPress={() =>
        setParams({mode: params.mode === 'edit' ? '' : 'edit'})}
/>
<Button
    title="Go To Page1"
    onPress={() => {
        navigation.navigate('Page1',{ name: 'Devio' });
    }}
/>
const {navigation} = this.props;
const {state, setParams} = navigation;
const {params} = state;
const showText = params.mode === 'edit' ? '正在编辑' : '编辑完成';
```





#### 使用setParams 改变route params

`setParams: function setParams(params)`： 我们可以借助`setParams`来改变route params，比如，通过`setParams`来更新页面顶部的标题，返回按钮等；

```js
class ProfileScreen extends React.Component {
  render() {
    const {setParams} = this.props.navigation;
    return (
      <Button
        onPress={() => setParams({name: 'Lucy'})}
        title="Set title name to 'Lucy'"
      />
     )
   }
}
```

*注意navigation.setParams改变的是当前页面的Params，如果要改变其他页面的Params可以通过NavigationActions.setParams完成，下文会讲到。*



#### 使用goBack返回到上一页面或指定页面

`goBack: function goBack(key)`：我们可以借助`goBack`返回到上一页或者路由栈的指定页面。

- 其中`key`表示你要返回到页面的页面标识如`id-1517035332238-4`，不是routeName。
- 可以通过指定页面的`navigation.state.key`来获得页面的标识。
- key非必传，也可传null。

```js
navigation.state {params: {…}, key: "id-1517035332238-4", routeName: "Page1"}
```



```js
export default class Page1 extends React.Component {
    render() {
        const {navigation} = this.props;
        return <View style=>
            <Text style={styles.text}>欢迎来到Page1</Text>
            <Button
                title="Go Back"
                onPress={() => {
                    navigation.goBack();
                }}
            />
        </View> 
    }
}
```





#### 通过dispatch发送一个action

`dispatch: function dispatch(action)`：给当前界面设置action，会替换原来的跳转，回退等事件。

```js
const resetAction = NavigationActions.reset({
	index: 0,
	actions: [
	    NavigationActions.navigate({
	        routeName: 'HomePage',
	        params:{
	            theme:theme,
	            selectedTab:selectedTab
	        },
	    })
	]
	})
navigation.dispatch(resetAction)
```





### NavigationActions

- Navigate : 导航到其他的页面；
- Reset : 重置当前 state 到一个新的state；
- Back : 返回到上一个页面；
- Set Params : 设置指定页面的Params；
- Init : 初始化一个 state 如果 state 是 undefined；





#### Navigate：

Navigatie action会使用Navigate action的结果来更新当前的state。

- routeName：字符串，必选项，在app的router里注册的导航目的地的routeName。
- params：对象，可选项，融合进目的地route的参数。
- actions：对象，可选项(高级)，如果screen也是一个navigator，次级action可以在子router中运行。在文档中描述的任何actions都可以作为次级action。

```js
import { NavigationActions } from 'react-navigation'

const navigateAction = NavigationActions.navigate({
  routeName: 'Profile',
  params: {},
  action: NavigationActions.navigate({ routeName: 'SubProfileRoute'})
})
this.props.navigation.dispatch(navigateAction)
```





#### Reset：

Reset action删掉所有的navigation state并且使用这个actions的结果来代替。

- index，number，必选，navigation state中route数组中激活route的index。
- actions，array，必选项，Navigation Actions数组，将会替代navigation state。

```js
import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Profile'})
  ]
})
this.props.navigation.dispatch(resetAction)
```

*使用场景比如进入APP首页后的splash页不在使用，这时可以使用*`NavigationActions.reset`*重置它。*

index参数被用来定制化当前激活的route。举个例子：使用两个routes WelcomePage和HomePage给一个基础的stack navigation设置。为了重置route到HomePage，但是在堆栈中又存放在WelcomePage之上，你可以这么做:

```js
import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
    index: 1,
    actions: [
        NavigationActions.navigate({ routeName: 'WelcomePage'}),
        NavigationActions.navigate({ routeName: 'HomePage'})
    ]
});
this.props.navigation.dispatch(resetAction);
```



#### Back

返回到前一个screen并且关闭当前screen.backaction creator接受一个可选的参数:

- key：这个可以和上文中讲到的goBack的key是一个概念；

```js
import { NavigationActions } from 'react-navigation'
const backAction = NavigationActions.back();
this.props.navigation.dispatch(backAction);
```



#### SetParams

通过SetParams我们可以修改指定页面的Params。

- params：对象，必选参数，将会被合并到已经存在页面的Params中。
- key：字符串，必选参数，页面的key。

```js
import { NavigationActions } from 'react-navigation'
const setParamsAction = NavigationActions.setParams({
    params: { title: 'HomePage' },
    key: 'id-1517035332238-4',
});
```

*有很多小伙伴可能会问：navigation中有setParams为什么还要有NavigationActions.setParams?*

我从两方面来回答一下这个问题：

1. 在上文中讲到过navigation中有可能只有state与dispatch，这个时候如果要修改页面的Params，则只能通过`NavigationActions.setParams`了；
2. 另外，navigation.setParams只能修改当前页面的Params，而`NavigationActions.setParams`可以修改所有页面的Params；





## 还有那些应用场景？

### 在导航器屏幕之外使用导航功能(巧用导航器的ref)

有一种场景：有的时候我们需要在导航器中所定义的屏幕之外使用导航器来做页面跳转。

- 屏幕之间的跳转是需要借助`navigation`来完成的；
- 我们知道导航器中定义的屏幕可以通过`const {navigation} = this.props;`来获取`navigation`；
- 那么，如果我们在非导航器中所定义的屏幕中做屏幕跳转的关键一步，就是要想法获取`navigation`；
- 那么，如何才能在非导航器中所定义的屏幕中获取到这个`navigation`呢？

下面就给大家讲解通过`ref`属性还获得`navigation`：

```js
import { NavigationActions } from 'react-navigation';

const AppNavigator = StackNavigator(SomeAppRouteConfigs);

class App extends React.Component {
  someEvent() {
    // call navigate for AppNavigator here:
    this. navigation && this. navigation.dispatch(
      NavigationActions.navigate({ routeName: someRouteName })
    );
  }
  render() {
    return (
      <AppNavigator ref={nav => { navigation = nav; }} />
    );
  }
}
```

*上述代码通过***导航器的顶级节点***的*`ref`*属性获取到*`navigation`*，当上述代码的*`AppNavigator`*节点被渲染时，ref会被回调这是就可以获取到*`navigation`*了，需要提醒大家的是，这种用法对除*`StackNavigator`*之外的其他两种类型的导航器也是实用的哦；*