export default class Post{
    public postType: string;
    public postValue : string;

    public likeCount: number;
    public commentList: any[];


    public constructor(){
        this.postType = 'TEXT';
        this.postValue = '';
        this.likeCount = 0;
        this.commentList=[];
    }
}