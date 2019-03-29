<template>
    <div>
        <el-row class="breadcrumb">
            <el-col :span="4"><h3>表单</h3></el-col>
            <el-col :span="20">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>增删改查</el-breadcrumb-item>
                    <el-breadcrumb-item>表单</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-card>
            <el-form :model="user" ref="user" label-width="80px" v-loading="$store.state.loading" :rules="rules">
                <el-form-item label="真实姓名" prop="realName">
                    <el-input v-model="user.realName"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input-number v-model="user.age" :min="1" :max="200" class="full-width" controls-position="right"></el-input-number>
                </el-form-item>
                <el-form-item label="标签多选" prop="tags">
                    <el-select v-model="user.tags" multiple placeholder="请选择标签" class="full-width">
                        <el-option v-for="tag in tagList" :key="tag.key" :label="tag.value" :value="tag.key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签单选" prop="tag">
                    <el-select v-model="user.tag" clearable placeholder="请选择标签" class="full-width">
                        <el-option v-for="tag in tagList" :key="tag.key" :label="tag.value" :value="tag.key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-cascader :options="locations" v-model="user.address" placeholder="请选择地址" clearable class="full-width"></el-cascader>
                </el-form-item>
                <el-form-item label="注册日期" prop="createDate">
                    <el-date-picker v-model="user.createDate" type="datetime" class="full-width" placeholder="选择注册日期" align="right" :picker-options="$store.state.pickerOptions"></el-date-picker>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-radio class="radio" v-model="user.gender" :label="1">男</el-radio>
                    <el-radio class="radio" v-model="user.gender" :label="0">女</el-radio>
                </el-form-item>
                <el-form-item label="兴趣爱好" prop="hobby">
                    <el-checkbox-group v-model="user.hobby" :min="1" :max="3">
                        <el-checkbox v-for="hobby in hobbyList" :label="hobby.key" :key="hobby.key">{{hobby.value}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="上传头像" prop="avatar">
                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="uploaded">
                        <img v-if="user.avatar" :src="user.avatar" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="个人简介" prop="description">
                    <quill-editor v-model="user.description">
                    </quill-editor>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" :loading="$store.state.loading">立即创建</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<style>
    .ql-container .ql-editor {
        min-height: 10em;
        max-height: 15em;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
    }

    .avatar {
        width: 60px;
        height: 60px;
        display: block;
    }
</style>
<script>
    export default {
        name: "Forms",
        data() {
            return {
                user: {realName: '', age: 20, gender: 1, hobby: [1], tags: [], tag: 1, createDate: '', address: [], description: '', avatar: ''},
                hobbyList: [{key: 1, value: '电影'}, {key: 2, value: '钢琴'}, {key: 3, value: '绘画'}, {key: 4, value: '吉他'}, {key: 5, value: '游戏'}],
                tagList: [{key: 1, value: '开朗'}, {key: 2, value: '内向'}, {key: 3, value: '人来疯'}, {key: 4, value: '乐天派'}],
                locations: [{value: 'liaoning', label: '辽宁', children: [{value: 'shenyang', label: '沈阳'}, {value: 'dalian', label: '大连'}]}, {value: 'shandong', label: '山东', children: [{value: 'jinan', label: '济南'}, {value: 'qingdao', label: '青岛'}]}],
                rules: {
                    realName: [{required: true, message: '请输入真实姓名'}, {min: 3, max: 5, message: '长度在 3 到 5 个字符'}],
                    age: [{required: true, message: '请输入年龄'}],
                    tags: [{type: 'array', required: true, message: '请至少选择一个标签', trigger: 'change'}],
                    tag: [{required: true, message: '请选择标签'}],
                    address: [{required: true, message: '请选择地址'}],
                    createDate: [{type: 'date', required: true, message: '请选择注册时间', trigger: 'change'}]
                }
            };
        },
        methods: {
            onSubmit() {
                var self = this;
                self.$refs['user'].validate((valid) => {
                    if (valid) {
                        self.$store.dispatch('Loading', true);
                        setTimeout(function () {
                            self.$notify({title: '系统提示', message: '保存成功！', type: 'success'});
                            self.$store.dispatch('Loading', false);
                            self.reset();
                        }, 1500);
                    } else {
                        return false;
                    }
                });
            },
            reset() {
                this.$refs['user'].resetFields();
            },
            uploaded(res, file) {
                this.user.avatar = URL.createObjectURL(file.raw);
            },
        }
    }
</script>
