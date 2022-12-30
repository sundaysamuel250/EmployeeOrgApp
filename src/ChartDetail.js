import React, { Component } from 'react';
import EmployeeNode from './EmployeeNode';
import * as Diagramming from '@mindfusion/diagramming';
import * as Drawing from '@mindfusion/drawing';
import { DiagramView, NodeListView } from '@mindfusion/diagramming-react';

class ChartDetail extends Component {
  constructor(props) {
    super(props);

    this.diagramViewControl = React.createRef();

    var nodes = [];
    var nodeIds = [];

    // create the diagram
    var diagram = new Diagramming.Diagram();
    diagram.theme = Diagramming.Theme.getBusiness();
    diagram.routeLinks = true;
    diagram.allowInplaceEdit = true;
    diagram.licenseLocation = "./license_file..";
    diagram.bounds = new Drawing.Rect(0, 0, 500, 500);

    var employeeNode = new EmployeeNode(diagram);
    employeeNode.image = require("./images/MARK.jpg");
    employeeNode.name = "Mark Zuckerberg";
    employeeNode.title = "CEO";
    employeeNode.department = "Facebook";
   
    employeeNode.bounds = new Drawing.Rect(20, 10, 50, 60);

    diagram.addItem(employeeNode);

    var employeeNode1 = new EmployeeNode(diagram);
    employeeNode1.image = require("./images/BOB.jpg");
    employeeNode1.name = "First Last Name";
    employeeNode1.title = "Project Manager";
    employeeNode1.department = "Facebook";
    employeeNode1.brush = "blue";

    nodes.push(employeeNode1);
    nodeIds.push("new Project Manager");  
    
    var employeeNode2 = new EmployeeNode(diagram);
    employeeNode2.image = require("./images/SARAH.jpg");
    employeeNode2.name = "First Last Name";
    employeeNode2.title = "Team lead";
    employeeNode2.department = "Facebook";
    employeeNode2.brush = "green";

    nodes.push(employeeNode2);
    nodeIds.push("Team Manager");  

    
    diagram.customNodeType = EmployeeNode;
    diagram.behavior = Diagramming.Behavior.Custom;

    this.state = {
      diagram: diagram,   
      nodes: nodes,
      nodeCaptions: nodeIds,   
    }
  }


onDiagramNodeClicked(diagram, args)
{
  var clickedNode = args.node;

  if(clickedNode.namedComponents)
  {
    var rootPanel = clickedNode.getComponent("Root");
    var clickedComponent = rootPanel.hitTest(args.mousePosition);

    this.state.clickedComponent = clickedComponent;

    if(clickedComponent.image)
    {
      clickedComponent.visible = "hidden";

      var imageUrlComponent = clickedNode.getComponent("ImageUrl");

      if(imageUrlComponent)
      {
        imageUrlComponent.visibility = Drawing.Visibility.Visible;
        clickedComponent.visibility = Drawing.Visibility.Hidden;
      }
    }

    this.diagramViewControl.current.control.beginEdit(clickedNode, args.mousePosition);
  
  }

}

onLeaveInplaceEditMode(sender, args)
{
  
  if(this.state.clickedComponent == null)
     return;

    var htmlInput = args.control;
    var node = args.item.node;

    if(this.state.clickedComponent.image)
    {
      var defaultText = "double-click to edit image url";
      
      var newImageUrl = htmlInput.value;

      let urlComponent = node.getComponent("ImageUrl");
      if (urlComponent) {
        args.control.value = defaultText;
        urlComponent.text = defaultText;
        urlComponent.visibility = Drawing.Visibility.Hidden;
    }

      let imageComponent = node.getComponent("Image");
     if (imageComponent)
     {
        if (newImageUrl && newImageUrl !== defaultText)
          imageComponent.defaultProperty = newImageUrl;
        imageComponent.visibility = Drawing.Visibility.Visible;
      }  
    }
    else if (node)
    {
      node.invalidate();
    }   
 }


  render() {
    var props = {
      "id": "diagram1",     
      "backBrush": "#e0e9e9"
    };

    return (
        <div className="container">    
          <NodeListView className="item"
          nodes={this.state.nodes} 
          captions={this.state.nodeCaptions} 
          defaultNodeSize={new Drawing.Size(80, 70)} 
          iconSize={new Drawing.Size(55, 40)}></NodeListView>       
        <DiagramView  ref={this.diagramViewControl}  className="item-center" diagram={this.state.diagram}{...props} 
        onNodeClicked={(diagram, args) => this.onDiagramNodeClicked(diagram, args)}
        onLeaveInplaceEditMode={(sender, args) => this.onLeaveInplaceEditMode(sender, args)}/>
                  </div>
        );
    }

}

export default ChartDetail;