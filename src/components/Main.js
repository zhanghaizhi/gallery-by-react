require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

var imageDatas = require('../data/imageDatas.json');

imageDatas=(function fenImageURL(imageDatasArr){
	for(var i = 0;i<imageDatasArr.length;i++){
		var singleImageData =imageDatasArr[i]
		singleImageData.imageURL=require('../images/'+singleImageData.filename)
		imageDatasArr[i]=singleImageData
	}
	return imageDatasArr;
})(imageDatas)
class AppComponent extends React.Component {
  render() {
    return (
     	<section className="stage">
     		<section className="img-sec"></section>
     		<section className="controller-nav"></section>
     	</section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
