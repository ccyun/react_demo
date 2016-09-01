; (function () {

    /**
     * 普通文本框
     **/
    var Input = React.createClass({
        render: function () {
            return (
                <lable>
                    <h3>{this.props.tagName}</h3>
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
        getInitialState: function () {
            return {
                error: ""
            }
        },
        onChange: function (e) {
            this.props.onChange(e)
            var error = ""
            if (e.target.value == 'C') {
                error = "error…"
            }
            this.setState({
                error: error
            })
        },
        render: function () {
            var optionList = this.props.options.map(function (o, k) {
                return (
                    <option key={"o" + k} value={o.value}>{o.name}</option>
                );
            });
            return (
                <lable>
                    <h3>{this.props.tagName}</h3>
                    <select name={this.props.name} onChange={this.onChange} className={this.props.class} defaultValue={this.props.value}>
                        {optionList}
                    </select>
                    <span>{this.state.error}</span>
                </lable>
            );
        },
    });
    var Checkbox = {}
    var Textarea = {}
    var Radio = {}



    var Form = React.createClass({
        render: function () {
            return (
                <form action={this.props.action} method={this.props.method} className={this.props.class} onSubmit={this.props.onSubmit}>
                    {this.props.children}
                </form>
            )
        }
    });


    var App = React.createClass({
        getInitialState: function () {
            return this.props.data;
        },
        onChange: function (e) {
            var newState = {};
            newState[e.target.name] = e.target.value;
            this.setState(newState);
        },
        onSubmit: function (e) {
            e.preventDefault();
            console.log(this.state)

        },



        render: function () {
            return (
                <Form action="http://www.baidu.com" method="post" class="formClass" onSubmit={this.onSubmit} data={this.state}>
                    <Input tagName="这是一个文本框:" name="input_text" class="f_i_t" onChange={this.onChange} value={this.state.input_text}/>
                    <Select tagName="这是一个选择:" name="input_select" class="f_i_t" onChange={this.onChange} value={this.state.input_select} options={[{ name: "AAA", value: "A" }, { name: "BBB", value: "B" }, { name: "CCC", value: "C" }]}/>
                    <Submit name="提交" class="f_i_t"/>
                </Form>
            )
        }
    });



    ReactDOM.render((function () {
        var data = {
            input_text: "inputValue",
            input_select: "C"
        };
        return (
            <App data={data}/>
        )
    })()
        , document.getElementById('app'));
})();