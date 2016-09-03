; (function () {
    var SetIntervalMixin = {
        setInterval: function () {
            this.intervals.push(setInterval.apply(null, arguments));
        },
        //componentWillMount挂在前立即调用
        componentWillMount: function () {
            this.intervals = [];
        },
        //被卸载和摧毁前被立即调用
        componentWillUnmount: function () {
            this.intervals.forEach(clearInterval);
        }
    };


    /**
     * 普通文本框
     **/
    var Input = React.createClass({
        mixins: [React.addons.LinkedStateMixin],
        handleClick: function () {
            this.refs[this.props.name].focus()
        },
        getInitialState: function () {
            return {
                message: this.props.value
            };
        },

        render: function () {

            return (
                <lable onClick={this.handleClick}>
                    <h3>{this.props.tagName}</h3>
                    <input type="text" ref={this.props.name} name={this.props.name} valueLink={this.linkState('message')} className={this.props.class} defaultValue={this.props.value}/>
                    <span>valueLink is {this.state.message}</span>
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
        componentWillUnmount:function(){
            //不会渲染
            this.setState({
                error:"1111"
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
        mixins: [SetIntervalMixin],
        getInitialState: function () {
            return {
                seconds: 0
            };
        },
        tick: function () {
            this.setState({ seconds: this.state.seconds + 1 });
        },
        //在挂载发生后被立即调用
        componentDidMount: function () {
            this.setInterval(this.tick, 1000); // 调用 mixin 的方法
        },
        render: function () {
            return (
                <form action={this.props.action} method={this.props.method} className={this.props.class} onSubmit={this.props.onSubmit}>
                    {this.props.children}
                    已经运行 {this.state.seconds} 秒
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
                    <Input tagName="这是一个文本框:" key="a1" name="input_text" ref="input_text" class="f_i_t" value={this.state.input_text}/>
                    <Input tagName="这是一个文本框2:" key="a2" name="input_text2" ref="input_text2" class="f_i_t" value={this.state.input_text2}/>
                    <Select tagName="这是一个选择:" name="input_select" class="f_i_t" onChange={this.onChange} value={this.state.input_select} options={[{ name: "AAA", value: "A" }, { name: "BBB", value: "B" }, { name: "CCC", value: "C" }]}/>
                    <Submit name="提交" class="f_i_t" />
                </Form>
            )
        }
    });



    ReactDOM.render((function () {
        var data = {
            input_text: "inputValue",
            input_text2: "inputValue2",
            input_select: "C"
        };
        return (
            <App data={data}/>
        )
    })()
        , document.getElementById('app'));
})();