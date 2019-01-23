import React,{Component} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import fetch from "isomorphic-fetch";
// 引入组件
// 前台展示
import Protal from '../components/protal/index';
import ArticleLists from '../components/articleLists/index';
import WriteArticle from '../components/writeArticle/index';
import UploadArticle from '../components/uploadArticle/index';
// import SendMessage from '../components/sendMessage/index';
import ArticleDetails from '../components/articleDetail/index';
// 后台管理
import UserInfo from '../components/admin/users/index';
import BlogLists from '../components/admin/manageblogs/index';
import Cooperation from '../components/admin/users/cooperation/index';
import NotFound from '../components/admin/common/notfound';

class RouteConfig extends Component {
    render() {
        return (
          <Router>
            <Switch>
              <Route exact path="/" component={Protal} />
              <Route path="/articleLists" component={ArticleLists}></Route>
              <Route path="/writeArticle" component={WriteArticle}></Route>
              <Route path="/uploadArticle" component={UploadArticle}></Route>
              {/* <Route path="/sendMessage" component={SendMessage}></Route> */}
              <Route exact path="/articleDetails" component={ArticleDetails}></Route>
              <Route exact path="/user" component={UserInfo}>
                  {/* <IndexRoute component={UserInfo} /> */}
                  <Route path='/user/About' component={Cooperation} />
                  {/* <Route path='/userInfo/News' component={News} />
                  <Route path='/userInfo/Team' component={Team} /> */}
              </Route>
              <Route exact path="/manageBlogs" component={BlogLists} />
              <Route path="*" component={NotFound}/>
            </Switch>
          </Router>
      )
    }
}
export default RouteConfig;
