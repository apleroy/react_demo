var Article = React.createClass({
    render: function () {
        return (
            <div className="article">
                <h2 className="articleAuthorTitle">
                    {this.props.author} | {this.props.title}
                </h2>
                {this.props.body}
            </div>
        );
    }
});

var ArticleList = React.createClass({
    render: function () {
        var articleNodes = this.props.articles.map(function (article, index) {
            return (
                <Article author={article.author} title={article.title} body={article.body} key={index} />
            );
        });

        return (
            <div className="articleList">
                {articleNodes}
            </div>
        );
    }
});

var ArticleBox = React.createClass({
    getInitialState: function () {
        return {articles: []};
    },
    componentDidMount: function () {
        this.loadArticlesFromServer();
    },
    loadArticlesFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (articles) {
                this.setState({articles: articles});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleArticleSubmit: function(article) {
        var articles = this.state.articles;
        var newArticles = articles.concat([article]);
        this.setState({articles: newArticles});
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: {"article": article},
            success: function(data) {
                this.loadArticlesFromServer();
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div className="articleBox">
                <h1>Articles</h1>
                <ArticleList articles={this.state.articles} />
                <ArticleForm onArticleSubmit={this.handleArticleSubmit}/>
            </div>
        );
    }
});

var ArticleForm = React.createClass({
    handleSubmit: function() {
        var author = this.refs.author.getDOMNode().value.trim();
        var title = this.refs.title.getDOMNode().value.trim();
        var body = this.refs.body.getDOMNode().value.trim();
        this.props.onArticleSubmit({author: author, title: title, body: body});
        this.refs.author.getDOMNode().value = '';
        this.refs.title.getDOMNode().value = '';
        this.refs.body.getDOMNode().value = '';
        return false;
    },
    render: function() {
        return (
            <form className="articleForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" ref="author" />
                <input type="text" placeholder="Title..." ref="title" />
                <input type="text" placeholder="Article Text..." ref="body" />
                <input type="submit" value="Post" />
            </form>
        );
    }
});

var ready = function () {
    ReactDOM.render(
        <ArticleBox url="/articles.json" />,
        document.getElementById('articles')
    );
};


$(document).ready(ready);