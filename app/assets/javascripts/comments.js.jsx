var HelloWorld = React.createClass({
    render: function() {
        return (
            <div className='HelloWorld'>
                Hello, world!
            </div>
        );
    }
});

var ready = function () {
    ReactDOM.render(
        <HelloWorld />,
        document.getElementById('comments')
    );
};

$(document).ready(ready);