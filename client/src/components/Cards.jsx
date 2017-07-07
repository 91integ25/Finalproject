import React from 'react';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const Cards = () => (
  <div id="card-set">
  <Card id="card-1" className="landing-page-cards">
    <CardMedia >
      <i className="fa fa-fighter-jet fa-5x" aria-hidden="true"></i>

    </CardMedia>
    <CardTitle title="Card title" subtitle="Card subtitle" />
    <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
  </Card>

  <Card id="card-2" className="landing-page-cards">
    <CardMedia >
      <i className="fa fa-bolt fa-5x" aria-hidden="true"></i>

    </CardMedia>
    <CardTitle title="Card title" subtitle="Card subtitle" />
    <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
    
  </Card>

  <Card id="card-3" className="landing-page-cards">
    <CardMedia >
      <i className="fa fa-exclamation fa-5x" aria-hidden="true"></i>

    </CardMedia>
    <CardTitle title="Card title" subtitle="Card subtitle" />
    <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
    
  </Card>
  </div>
);

export default Cards;