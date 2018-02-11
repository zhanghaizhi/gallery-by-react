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
var ImgFigure = React.createClass({
	render(){
		return (
			<figure className="img-figure">
				<img src={this.props.data.imageURL} alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figcaption>
			</figure>
		)
	}
})
function getRangeRandom(low,high){
		return Math.ceil(Math.random*(high-low)+low)
}

class AppComponent extends React.Component {
	Constant:{
		centerPos:{
			left:0,
			right:0
		},
		hPosRange:{
			leftSecx:[0,0],
			rightSecx:[0.0],
			y:[0,0]
		},
		vPosRange:{
			x:[0,0],
			topY:[0,0]
		}
	},
	// 重新布局所有图片
	rearrange:function(centerIndex){
		var imgsArrangeArr =this.state.imgsArrangeArr,
			Constant = this.Constant,
			centerPos = Constant.centerPos,
			hPosRange = Constant.hPosRange,
			vPosRange = Constant.vPosRange,
			hPosRangeLeftSecx = hPosRange.leftSecx,
			hPosRangeRightSecx = hPosRange.rightSecx,
			hPosRangeY = hPosRange.y,
			vPosRangeTopY = vPosRange.topY,
			vPosRangeX = vPosRange.x,
			imgsArrangeArr = [],
			topImgNum = Math.ceil(Manth.random()*2),//取一个或者不取
			topImgSpliceIndex = 0,
			imgsArrangeArrCenterArr = imgsArrangeArr.splice(centerIndex,1);
			//首先居中 centerIndex 的图片
			imgsArrangeArrCenterArr[0].pos = centerPos;
			//取出要布局上侧的图片的状态信息
			topImgSpliceIndex =Math.ceil(Math.random()*(imgsArrangeArr.length-topImgNum));
			imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum); 
			//布局上侧图片
			imgsArrangeTopArr.forEach(function(value,index){
				imgsArrangeTopArr[index].pos={
					top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1])
					left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
				}
			})
			// 布局左右
			for(var i = 0;j = imgsArrangeArr.length,k=j/2;i<j;i++){
				
			}
	}
	,
	getInitialStage:function(){
		return {
			imgsArrangeArr:[
				// pos:{
				// 	left:'0',
				// 	top:'0'
				// }
			]
		}
	}
	//组件加载以后，为每张图片计算其位置范围
	componentDidMount:function(){
		var stageDOM=React.findDOMNode(this.refs.stage),
			stageW=stageDOM.scrollWidth,
			stageH=stageDOM.scrollHeight,
			halfStageW=Math.ceil(stageW / 2),
			halfStageH=Math.ceil(stageH / 2);
		//拿到imagefigure的大小
		var imgFigureDOM = React.findDOMNode(this.refs.imgFigure0),
			imgW = imgFigureDOM.scrollWidth,
			imgH = imgFigureDOM.scrollHeight,
			halfImgW = Math.ceil(imgW / 2),
			halfImgH = Math.ceil(imgH / 2);
		//计算中心图片位置点
		this.Constant.centerPos={
			left:halfStageW-halfImgW,
			top:halfStageH-halfImgH
		}
		this.Constant.hPosRange.leftSecx[0] =-halfImgW;
		this.Constant.hPosRange.leftSecx[1] = halfStageW-halfImgW*3;
		this.Constant.hPosRange.rightSecx[0] = halfStageW-halfImgW;
		this.Constant.hPosRange.rightSecx[1] = stageW-halfImgW;
		this.Constant.hPosRange.y[0] = -halfImgH;
		this.Constant.hPosRange.y[1] = stageH - halfImgH;

		this.Constant.vPosRange.topY[0] = -halfImgH;
		this.Constant.vPosRange.topY[1] = halfStageH - halfImgH*3;
		this.Constant.vPosRange.x[0] = halfImgW - imgW;
		this.Constant.vPosRange.x[1] = halfImgW;
	},
  render() {
	var controllerUnits =[];
	var imgFigures = [];
	imageDatas.forEach(function(value,index){
		if(!this.state.imgsArrangeArr[index]){
			this.state.imgsArrangeArr[index]={
				pos:{
					left:0,
					top:0
				}
			}
		}
		imgFigures.push(<ImgFigure data={value}  ref={'imgFigure'+index}/>)
	}.bind(this))
    return (
     	<section className="stage" ref="stage">
     		<section className="img-sec">
				{imgFigures}
     		</section>
     		<section className="controller-nav">
				{controllerUnits}
     		</section>
     	</section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
