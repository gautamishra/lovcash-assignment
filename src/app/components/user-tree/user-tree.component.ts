import { Component, OnInit, ViewChild } from '@angular/core';
import { ITreeOptions, KEYS, TreeModel, TreeComponent } from 'angular-tree-component';
import * as _ from 'lodash';
// Internal Impors
import { TreeNodeModal } from 'src/app/modal/tree-modal';

const nodes: TreeNodeModal[] = [
  {
    id: 1,
    name: 'root1',
    children: [
      { id: 2, name: 'child1' },
      { id: 3, name: 'child2' }
    ],
    isExpanded: false
  },
  {
    id: 4,
    name: 'root2',
    children: [
      { id: 5, name: 'child2.1' },
      {
        id: 6,
        name: 'child2.2',
        children: [
          { id: 7, name: 'subsub' }
        ]
      }
    ]
  }
];

@Component({
  selector: 'app-user-tree',
  templateUrl: './user-tree.component.html',
  styleUrls: ['./user-tree.component.scss']
})

export class UserTreeComponent implements OnInit {
  options: ITreeOptions = {
    displayField: 'name',
    actionMapping: {
      keys: {
        [KEYS.ENTER]: (tree, node, $event) => {
          node.expandAll();
        }
      }
    }
  };

  selectedNode: TreeNodeModal;
  nodes = nodes;
  nodeToBeDeleted: number;
  lastId = 7;
  newNodeName = '';
  showAddNodeDiv = false;

  @ViewChild('treeModal') private tree: TreeComponent;
  constructor() { }

  ngOnInit() {
  }

  selectNode = (node: TreeNodeModal) => {
    this.selectedNode = (!!this.selectedNode && node.id === this.selectedNode.id) ? null : node;
  }

  findNodeByid = (node: TreeNodeModal[], id: number, callback) => {
    // this.nodes.forEach()

    _.forEach(node, (ele) => {
      if (ele.id === id) {
        callback(ele, node);
        return false;
      } else if (!!ele.children && ele.children.length) {
        return this.findNodeByid(ele.children, id, callback);
      }
    });
  }

  deleteNode = () => {
    this.deleteSelectedNode(this.nodes);
    // this.nodeToBeDeleted.forEach((delEle) => {
    //   this.findNodeByid(this.nodes, delEle, (ele: TreeNodeModal, node?: TreeNodeModal[]) => {
    //     node = node.filter((val) => val.id !== ele.id);
    //   });
    // });
    this.tree.treeModel.update();
    this.nodeToBeDeleted = null;
  }

  deleteSelectedNode = (treeNodes: TreeNodeModal[]) => {
    treeNodes.forEach((node, i = 0) => {
      if (this.nodeToBeDeleted === node.id) {
        treeNodes.splice(i, 1);
      } else if (!!node.children && node.children.length > 0) {
        this.deleteSelectedNode(node.children);
      }
    });
  }

  addElement = () => {
    const data: TreeNodeModal = {
      id: ++this.lastId,
      name: this.newNodeName
    };
    let parentNode;
    this.findNodeByid(this.nodes, this.selectedNode.id, (ele: TreeNodeModal, node?: TreeNodeModal[]) => {
      parentNode = ele;
    });
    if (!!parentNode.children) {
      parentNode.children.push(data);
    } else {
      parentNode.children = [];
      parentNode.children.push(data);
    }
    this.tree.treeModel.update();
    this.tree.treeModel.getActiveNode().expand();
    this.newNodeName = '';
    this.showAddNodeDiv = false;
  }

  addToDeletedQueue = (event: any, id: number) => {
    this.nodeToBeDeleted = (!!this.nodeToBeDeleted && this.nodeToBeDeleted === id) ? null : id;
  }
}
