import { LightningElement, api } from 'lwc';

export default class MovieTile extends LightningElement {
    @api movie;

    connectedCallback() {
    console.log('Movie passed to tile:', this.movie);
}
}