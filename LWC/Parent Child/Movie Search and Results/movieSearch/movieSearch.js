import { LightningElement } from 'lwc';

const DELAY = 300;

export default class MovieSearch extends LightningElement {
    selectedType = "";
    loading = false;
    selectedSearch = "";
    selectedPageNo = "1";
    delayTimeout;
    searchResult = [];
    get typeoptions() {
        return [
            { label: "None", value: "" },
            { label: "Movie", value: "movie" },
            { label: "Series", value: "series" },
            { label: "Episode", value: "episode" }
        ];
    }

    handlechange(event) {
        const { name, value } = event.target;
        this.loading = true;

        if (name === "type") {
            this.selectedType = value;
        } else if (name === "search") {
            this.selectedSearch = value;
        } else if (name === "pageno") {
            this.selectedPageNo = value;
        }

        clearTimeout(this.delayTimeout)
        this.delayTimeout = setTimeout(()=>{
            this.handleSubmit();
        },DELAY);

        
    }
    
    handleSubmit() {
        this.searchMovie();
    }
    async searchMovie() {
        try {
            if(this.selectedSearch != null){
                const url = `https://www.omdbapi.com/?s=${this.selectedSearch}&type=${this.selectedType}&page=${this.selectedPageNo}&apikey=54df2116`;
                console.log(url);
                const res = await fetch(url);
                const data = await res.json();
                console.log("Movie Search output", data);
                this.loading = false;
                if(data.Response==="True"){
                    this.searchResult = data.Search;
                    console.log("Search Result", this.searchResult);
                }    
            }
            else{
                //this.searchResult = null;
                refreshApex(this.searchResult);
            }
            
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            this.loading = false;
        }
    }
}
