<template>
    <div class="star-btn">
        <slot />
    </div>
</template>

<style scoped lang="scss">
.star-btn {
    background: linear-gradient(180deg, #42C4EB, #17B0DD);
    border: 1px solid rgba(51, 100, 237, .35);
    border-radius: 3px;
    box-shadow: inset 0 -2px 0 0 #16A3CE, 0 3px 4px 0 rgba(23, 176, 221, .32);
    padding: 14px 30px;
    width: 100%;
    cursor: pointer;
    height: 48px;
    font-weight: 500;
    transition: all .2s;
    display: inline-block;
    font-size: 13px;
    text-align: center;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    &:hover {
        transform: scale(1.01) translateY(-4px);
        box-shadow: inset 0 -2px 0 0 #16A3CE, 0 3px 4px 0 rgba(23, 176, 221, .32), 0 8px 20px 0 rgba(23, 176, 221, .4);
    }

    &:active {
        transform: scale(1);
        box-shadow: inset 0 -2px 0 0 #20B9E8, 0 3px 4px 0 rgba(23, 176, 221, .32);
        background: linear-gradient(180deg, #17B0DD, #42C4EB);
    }

    &.disabled {
        transform: scale(1);
        box-shadow: inset 0 -2px 0 0 #20B9E8, 0 3px 4px 0 rgba(23, 176, 221, .32);
        background: linear-gradient(180deg, #17B0DD, #42C4EB);
        filter: grayscale(0.8);
    }
}
</style>
