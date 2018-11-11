import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import * as LinkActions from './actions/LinkActions';
import {Row, Col, ButtonGroup, Button} from 'react-bootstrap';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTabIndex: 0
        }
    }

    componentDidMount(){
        this.props.dispatch(LinkActions.getLinksRequest({}));
        fetch('https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty')
            .then(response => response.json())
            .then(data => {
                let links = (data.kids || []).map(item => ({
                    id: item,
                    saved: false
                }));
                this.props.dispatch(LinkActions.getLinksSuccess({links}));
            })
            .catch(e => {
                console.log(e);
                this.props.dispatch(LinkActions.getLinksFail({}));
            })
    }

    saveLink(id) {
        const {links} = this.props;
        this.props.dispatch(LinkActions.saveLink({id: id}));
        let _links = links.map(link => {
            return (link.id === id && link.saved === false)
                ? {
                    id: link.id,
                    saved: true
                }
                : link.saved === true
                    ? {
                        id: link.id,
                        saved: true
                    }
                    : {
                        id: link.id,
                        saved: false
                    }
        });
        this.props.dispatch(LinkActions.getLinksSuccess({links: _links}));
    }

    removeLink(id) {
        const {links} = this.props;
        this.props.dispatch(LinkActions.removeLink({id: id}));
        let _links = links.map(link => {
            return (link.id === id && link.saved === true)
                ? {
                    id: link.id,
                    saved: false
                }
                : link.saved === true
                    ? {
                        id: link.id,
                        saved: true
                    }
                    : {
                        id: link.id,
                        saved: false
                    }
        });
        this.props.dispatch(LinkActions.getLinksSuccess({links: _links}));
    }

    getTabs(){
        return ["Tab 1", "Tab 2"]
    }

    tabClick(e, index) {
        if(this.state.currentTabIndex !== index){
            this.setState({
                currentTabIndex: index
            })
        }
    }

    renderLoading(){
        return(
            <Col sm={12}>
                <i className='fa fa-spinner fa-spin'/>
            </Col>
        )
    }

    renderLinks(links){
        return (
            <Col sm={12}>
                <ul>
                    {
                        this.state.currentTabIndex === 0
                            ? links.map(link => {
                                return <li key={link.id}>{link.id} <Button disabled={link.saved} onClick={e => this.saveLink(link.id)}>Save</Button></li>

                            })
                            : links.map(link => {
                                return link.saved
                                    ? <li key={link.id}>{link.id} <Button onClick={e => this.removeLink(link.id)}>Remove</Button></li>
                                    : null
                            })
                    }
                </ul>
            </Col>
        )
    }

    render() {
        const {links, data_loading} = this.props;
        return (
            <Row>
                <Col sm={12}>
                    <ButtonGroup>
                        {this.getTabs().map((tab, index) => (
                            <Button key={tab} onClick={e => this.tabClick(e, index)}>{tab}</Button>
                        ))}
                    </ButtonGroup>
                </Col>
                {data_loading
                    ? this.renderLoading()
                    : this.renderLinks(links)}
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        links: state.LinkReducer.links,
        data_loading: state.LinkReducer.waiting
    }
};

export default connect(mapStateToProps)(App);
