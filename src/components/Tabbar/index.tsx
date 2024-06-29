import { useNavigate } from 'react-router-dom';
import './style.scss';

const items = [{
  name: 'home',
  url: '/home',
  icon: '&#xe6af;',
  text: '首页'
}, {
  name: 'category',
  url: '/category',
  icon: '&#xe62f;',
  text: '分类'
}, {
  name: 'cart',
  url: '/cart',
  icon: '&#xe70b;',
  text: '购物车'
}, {
  name: 'my',
  url: '/my',
  icon: '&#xe64a;',
  text: '我的'
}]

function TabBar (props: {activeName: string}) {
  const navigate = useNavigate();
  const { activeName } = props;

  return (
    <div className='tabBar'>
      {
        items.map(item => (
          <div
            className={activeName === item.name ? 'tabBar-item tabBar-item-active' : 'tabBar-item' }
            onClick={()=> {navigate(item.url)}}
            key={item.name}
          >
            <p className='iconfont tabBar-item-icon' dangerouslySetInnerHTML={{
              __html: item.icon
            }}></p>
            <p className='tabBar-item-title'>{item.text}</p>
          </div>
        ))
      }
    </div>
  )
}
export default TabBar;