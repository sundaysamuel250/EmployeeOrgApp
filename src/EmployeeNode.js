import * as Diagramming from '@mindfusion/diagramming';

const EmployeeNodeBase = Diagramming.CompositeNode.classFromTemplate("EmployeeNodeBase",
{
	component: "GridPanel",
	name: "Root",
	rowDefinitions: ["*", "6", "6"],
	columnDefinitions: ["*"],
	children:
	[
		{
			component: "Rect",
			name: "Brush",		
            pen: "red",			
			brush: "pink",
		},
        {
			component: "Image",
			name: "Image",
			autoProperty: true,
			location: "MARK.jpg",			
			imageAlign: "Fit",
            gridRow: 0,
		},
		{
            component: "Text",
            name: "ImageUrl",
            autoProperty: true,
            text: "double-click to edit image url",
            font: "Arial regular 4",
			visibility: "Hidden",
            pen: "#343434",
			horizontalAlignment: "Stretch",
			verticalAlignment: "Stretch",
			padding: "1",
            gridRow: 0,
        },
        {
			component: "Rect",
			name: "Background",          
			pen: "white",
			brush: "orange",
			gridRow: 1,
		},
        {
            component: "Text",
            name: "Name",
            autoProperty: true,
            text: "name",
            font: "Arial 4",
            pen: "#343434",
			horizontalAlignment: "Center",
            gridRow: 1,
        },
		{
			component: "Rect",
			name: "Background",           
			pen: "gray",
			brush: "beige",
			gridRow: 2,
		},
		{
			component: "StackPanel",
			orientation: "Horizontal",
			gridRow: 2,			
			verticalAlignment: "Center",
			children:
			[
				{
					component: "Text",
					name: "Title",
					autoProperty: true,
					text: "title",
					font: "Arial 3 italic",
					pen: "#343434"
				},
				{
					component: "Text",
					name: "Department",
					autoProperty: true,
					text: "department",
					font: "Arial 3",
					pen: "#003466"					
				},				
			]
		}
    ]
});



class EmployeeNode extends EmployeeNodeBase {

	constructor(parent) {
		super(parent);
		//this._brush = "#cecece";
	};

	get brush() {
		return this._brush;
	}

	set brush(value) {
		this._brush = value;
	}

	// support for the NodeListView drag'n'drop
	clone() {
		let copy = super.clone();
		copy.brush = this._brush;
		return copy;
	}

	// clipboard and serialization support
	toJson() {
		let json = super.toJson();
		json.brush = this._brush;
		return json;
	}

	fromJson(json) {
		super.fromJson(json);
		this._brush = json.brush;
	}

	// undo/redo
	saveState() {
		let state = super.saveState();
		state.brush = this._brush;
		return state;
	}

	restoreState(state) {
		super.restoreState(state);
		this._brush = state._brush;
	}


	updateCanvasElements(state) {
		super.updateCanvasElements(state);
		var back = this.getComponent('Brush');
		back.brush = this.brush;
	}
}

Diagramming.Diagram.registerClass(EmployeeNode, "EmployeeNode");

export default EmployeeNode;
