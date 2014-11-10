function Range(min, max) {
    if (min > max) {
        this.min = max;
        this.max = min;
    } else {
        this.min = min;
        this.max = max;
    }
    this.span = this.max - this.min;

}
