import React from 'react';
import 'onsenui';
import {Tab,Toolbar,Tabbar,Page} from 'react-onsenui';
import Eatview from './Eatview.jsx';
import Deliverview from './Deliverview.jsx';
import Moreview from './Moreview.jsx';

// var MyTab = React.createClass({
//   renderToolbar: function() {
//     return (
//       <Toolbar>
//         <div className='center'>{this.props.title}</div>
//       </Toolbar>
//     );
//   },

//   render: function() {
//     return (
//       <Page renderToolbar={this.renderToolbar}>
//         <section style={{margin: '16px'}}>
//           <p>
//             This is the <strong>{this.props.title}</strong> tab.
//           </p>
//         </section>
//       </Page>
//     );
//   }
// });

var MyPage = React.createClass({
  getInitialState: function() {
    return {
      index: 0
    }
  },
  renderTabs: function() {
    return [
      {
        content: <Eatview />,
        tab: <Tab label='Eat' icon='md-pizza' />
      },
      {
        content: <Deliverview />,
        tab: <Tab label='Deliver' icon='md-run' />
      },
      {
        content: <Moreview />,
        tab: <Tab label='More' icon='md-settings' />
      }
    ];
  },

  render: function() {
    return (
      <Tabbar
        index={this.state.index}
        onPreChange={(event) =>
          {
            if (event.index != this.state.index) {
              this.setState({index: event.index});
            }
          }
        }
        renderTabs={this.renderTabs}
      />
    );
  }
});

export default MyPage;