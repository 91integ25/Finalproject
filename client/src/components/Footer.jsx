import React from 'react';
import FontIcon from 'material-ui/FontIcon';


/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class Footer extends React.Component {

  render() {
      return (
      <footer className="bottom-nav">
        Just some more Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. 
        <i class="fa fa-github fa-3x" aria-hidden="true"></i>
      </footer>
    );
  }
}