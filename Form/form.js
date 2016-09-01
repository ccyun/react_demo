; (function () {

    /**
     * 普通文本框
     **/
    var Input = React.createClass({
        render: function () {
            return (
                <lable>
                    <h3>{this.props.title}</h3>
                    <input type="text" name={this.props.name} onChange={this.props.onChange} className={this.props.class} defaultValue={this.props.value}/>
                </lable>
            )
        }
    });
    /**
     * 提交
     **/
    var Submit = React.createClass({
        render: function () {
            return (
                <lable>
                    <h3></h3>
                    <input type="submit" className={this.props.class} defaultValue={this.props.value}/>
                </lable>
            )
        }
    });
    /**
     * 普通选择
     **/
    var Select = React.createClass({
        render: function () {
            var optionList = this.props.option.map(function (o, k) {
                return (
                    <option key={"s" + k} value={o.value}>{o.name}</option>
                );
            });
            return (
                <lable>
                    <h3>{this.props.title}</h3>
                    <select name={this.props.name} onChange={this.props.onChange} className={this.props.class} defaultValue={this.props.value}>
                        {optionList}
                    </select>
                </lable>
            );
        },
    });



    var Form = React.createClass({
        getInitialState: function () {
            return this.props.data;
        },
        onSubmit: function (e) {
            e.preventDefault();
            console.log(this.state)
        },
        onChange: function (e) {
            console.log(e)
            var newState = {};
            newState[e.target.name] = e.target.value;
            this.setState(newState);
        },
        render: function () {
            var children = this.props.children
            var that = this
            if (children) {
                var childElements = children.map(function (child) {
                    if (typeof child.type === 'string') { return child; }
                    console.log(that.onChange)
                    
                })
            }
            return (
                <form action={this.props.action} method={this.props.method} className={this.props.class} onSubmit={this.onSubmit}>
                    {childElements}
                </form>
            )
        }
    });
    ReactDOM.render((function () {
        var data = {
            input_text: "inputValue",
            input_select: "C"
        };

        return (
            <Form action="http://www.baidu.com" method="post" class="formClass" data={data}>
                <Input title="这是一个文本框:" name="input_text" class="f_i_t" value={data.input_text}/>
                <Select title="这是一个选择:" name="input_select" class="f_i_t" value={data.input_select} option={[{ name: "AAA", value: "A" }, { name: "BBB", value: "B" }, { name: "CCC", value: "C" }]}/>
                <Submit name="提交" class="f_i_t"/>
                <div></div>
            </Form>
        )
    })()
        , document.getElementById('app'));
})();
