import React, { Component } from "react";

import { fetchPets } from "../../services/fetchPets";
import AnimalView from "../../components/AnimalView/AnimalView";

import './Homepage.css'

let timeout;
const debounce = (func, delay) => {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
};

export default class Homepage extends Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            limit: 10,
            sortBy: 'createdAt',
            order: '',
            name: '',
            petList: [],
        }
        this.handleChange = this.handleChange.bind(this);   
    }

    componentDidMount() {
        fetchPets({page: this.state.page, limit: this.state.limit}).then(res => {
            if(res){
                this.setState({petList: res});
            }
        })
    }

    componentDidUpdate(_prevProps, prevState) {
        const {page: prevPage, limit: prevLimit, sortBy: prevSortBy, order: prevOrder, name: prevName} = prevState
        const {page, limit, sortBy, order, name} = this.state;
        if((page !== prevPage) || (limit !== prevLimit) || (sortBy !== prevSortBy) || (order !== prevOrder) || (name !== prevName)){
            debounce(() => {
                fetchPets({page, limit, sortBy, order, name}).then(res => {
                    if(res){
                        this.setState({petList: res});
                    } else {
                        this.setState({petList: []});
                    }
                })
            }, 500)
        }
    }

    handleChange(e, param, value) {
        const parameters = {}
        switch(param) {
            case 'search':
                parameters.name = e.target.value;
                break;
            case 'page':
                let page = this.state.page;
                if(value){
                    parameters.page = page + 1;
                } else {
                    parameters.page = page > 1? page - 1 : 1;
                }
                break;
            case 'limit':
                parameters.limit = e.target.value;
                parameters.page = 1;
                break;
            case 'sort':
                parameters.sortBy = e.target.value;
                parameters.page = 1;
                parameters.limit = 10;
                break;
            case 'order':
                parameters.order = (!this.state.order || this.state.order === 'asc') ? 'desc' : 'asc';
                break;
            default:
                break;
        }
        this.setState(parameters);
    }

    render() {
        return <div className='homepage'>
            <div className='param-div'>
                <input 
                    className='search'
                    id='search'
                    name='search'
                    type='text'
                    placeholder='Search'
                    label='Search'
                    onChange={(e) => this.handleChange(e, 'search')}
                    value={this.state.name}
                />
                
            </div>
            <div className='pagination'>
                <button 
                    className='left' 
                    onClick={(e) => this.handleChange(e, 'page', 0)}
                    disabled={this.state.page === 1}
                >{'<'}</button>
                <button 
                    className='right' 
                    onClick={(e) => this.handleChange(e, 'page', 1)}
                    disabled={!this.state.petList.length}
                >{'>'}</button>
                <select name="limit" id="limit" className='limit' onChange={(e) => this.handleChange(e, 'limit')} value={this.state.limit}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                </select>

                <select name="sort" id="sort" className='sort' onChange={(e) => this.handleChange(e, 'sort')} value={this.state.sortBy}>
                    <option value="createdAt">Created At</option>
                    <option value="name">Name</option>
                    <option value="bornAt">Date of Birth</option>
                </select>

                <button 
                    className='order' 
                    onClick={(e) => this.handleChange(e, 'order')}
                >{(!this.state.order || this.state.order === 'asc') ? '▲' : '▼'}</button>
            </div>

            <div className='animal-list'>
                {this.state.petList.map(pet => <AnimalView key={pet.id} pet={pet} />)}
            </div>
            
        </div>
    }
}