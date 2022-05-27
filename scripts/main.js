//Pink from BetaMindy
let cols = [Pal.lancerLaser, Pal.accent, Color.valueOf("cc6eaf")];

function addTable(table){
    table.table(Styles.black5, cons(t => {
        t.background(Tex.button);
        let s = new Slider(-8, 8, 1, false);
        s.setValue(0);
        let l = t.label(() => {
            let v = s.getValue();
            if(v >= 0){
                return "x" + Math.pow(2, v);
            }else{
                return "x1/" + Math.pow(2, Math.abs(v));
            }
        }).growX().width(8.5 * 8).color(Pal.accent);
        let b = t.button(new TextureRegionDrawable(Icon.refresh), 24, () => s.setValue(0)).padLeft(6).get();
        b.getStyle().imageUpColor = Pal.accent;
        t.add(s).padLeft(6);
        s.moved(v => {
            let t = Math.pow(2, v);
            Time.setDeltaProvider(() => Math.min(Core.graphics.getDeltaTime() * 60 * t, 3 * t));
            l.color(Tmp.c1.lerp(cols, (s.getValue() + 8) / 16));
        });
    }));
    //add margin for v7
    if (Vars.mobile) table.marginBottom(50);
    table.fillParent = true;
    table.visibility = () => {
        if(!Vars.ui.hudfrag.shown) return false;
        if(Vars.ui.minimapfrag.shown()) return false;
        if(!Vars.mobile) return true;
        if(Vars.player.unit().isBuilding()) return false;
        if(Vars.control.input.block != null) return false;
        if(Vars.control.input.mode == PlaceMode.breaking) return false;
        //todo port to v7
        //if(Vars.control.input.selectRequests != null && !Vars.control.input.selectRequests.isEmpty() && Vars.control.input.lastSchematic != null && !Vars.control.input.selectRequests.isEmpty()) return false;
        return true;
    };
}

if(!Vars.headless){
    var tc = new Table();

    Events.on(ClientLoadEvent, () => {
        tc.bottom().left();
        addTable(tc);
        Vars.ui.hudGroup.addChild(tc);
    });
}
