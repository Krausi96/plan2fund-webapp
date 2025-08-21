import { Component } from "react";
export default class RuntimeGuard extends Component{
  constructor(p){ super(p); this.state={hasError:false, error:null}; }
  static getDerivedStateFromError(e){ return {hasError:true, error:e}; }
  componentDidCatch(e,info){ console.error("Runtime error:", e, info); }
  render(){
    if(this.state.hasError){
      return <div style={{padding:"1rem",border:"1px solid #f00",borderRadius:12,background:"#fff0f0"}}>
        <h3>Something went wrong.</h3>
        <pre style={{whiteSpace:"pre-wrap"}}>{String(this.state.error)}</pre>
      </div>;
    }
    return this.props.children;
  }
}
