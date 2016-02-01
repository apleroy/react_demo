var Comment = React.createClass({
    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                {this.props.comment}
            </div>
        );
    }
});

var ready = function () {
    ReactDOM.render(
        <Comment author="Richard" comment="This is a comment "/>,
        document.getElementById('comments')
    );
};

$(document).ready(ready);